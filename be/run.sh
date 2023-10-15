#!/bin/bash

function echoVar() {
  echo "$1: ${!1}"
}
function checkVar() {
  if [[ -z "${!1}" ]]; then
    echoRed "$1" is empty!
    return 1
  fi
}

# shellcheck disable=SC2034 # DIR may be used.
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
echoVar DIR

# shellcheck disable=SC2034 # sourced may be used.
(return 0 2>/dev/null) && sourced="y" || sourced="n"
echoVar sourced

# Turn them off by:
# setErr off
function setErr() {
    if [[ "$1" != "off" ]]; then
	echo "setErr on"
        _ERRON=yes
	set -e -E -o pipefail
    else
        echo "setErr off"
	_ERRON=no
        set +e +E +o pipefail
    fi
}
setErr

function echoErr() {
  rv=$?
  if [[ "${_ERRON}" == "no" ]]; then
    echoBlue "Error $rv in $0#$LINENO: $BASH_COMMAND"
    return 0
  fi
  echoRed "Error $rv in $0#$LINENO: $BASH_COMMAND"
  exit $rv
}
trap 'echoErr' ERR

function tput2() {
  if [[ -z "$TERM" ]]; then
    export MYTERM="dumb"
  else
    export MYTERM="$TERM"
  fi
  TERM="$MYTERM" tput "$@" || :
}
export -f tput2

function echoRed() {
  if [[ "$NOCOLOR" == "yes" ]]; then
    echo "$*"
    return
  fi
  fg=$(tput2 setaf 1)
  # bg=$(tput2 setab 9)
  clear=$(tput2 sgr0)
  echo "$fg$*$clear"
}
function echoGreen() {
  if [[ "$NOCOLOR" == "yes" ]]; then
    echo "$*"
    return
  fi
  fg=$(tput2 setaf 2)
  # bg=$(tput2 setab 9)
  clear=$(tput2 sgr0)
  echo "$fg$*$clear"
}
function echoBlue() {
  if [[ "$NOCOLOR" == "yes" ]]; then
    echo "$*"
    return
  fi
  fg=$(tput2 setaf 4)
  # bg=$(tput2 setab 9)
  clear=$(tput2 sgr0)
  echo "$fg$*$clear"
}

if [[ "$DEBUG" == "yes" ]]; then
  # shift
  set -x
fi

if [[ "$(uname)" == "Darwin" ]]; then
  this=$(realpath -q "$DIR")
else
  # shellcheck disable=SC2034
  this=$(realpath -e "$DIR")
fi
echoVar this

#---------- Deploy

export PROJ=bumou

function push() {
  rsync --exclude="main.db" --exclude="*.bak" -avzP "$DIR"/* bumou:~/website/bumou/be/
}

function setNginx() {
  sudo rsync "$DIR"/nginx/default /etc/nginx/sites-enabled/
  sudo nginx -t
  sudo nginx -s reload
}

function setCron() {
  cron='0 0 * * * bash /home/ubuntu/website/bumou/be/run.sh bkdb'
  crontab -l || echo "$cron" | crontab -
  (crontab -l ; echo "$cron") | sort | uniq | crontab -
  crontab -l
}

function bkdb() {
  cp /home/ubuntu/website/bumou/be/main.db /home/ubuntu/main-"$(date '+%Y%m%d-%H%M%S')".db
}

#---------- Start

install() {
  # chmod 755 /home/ubuntu
  sudo apt install -y gettext-base jq
  export PROJ_DIR="$DIR"
  envsubst <"$DIR"/templates/"${PROJ}".service | sudo tee /etc/systemd/system/"${PROJ}".service > /dev/null
  sudo systemctl enable "${PROJ}"
  sudo systemctl start "${PROJ}"
  systemctl status "${PROJ}"
}

function startInBg() {
  pushd "$DIR"
  killall go ||:
  ps aux | grep -F go||:
  . ~/.bashrc
  go version
  nohup bash $DIR/run.sh run 2>&1 &
  popd
}

function start() {
  . ~/.bashrc
  go run .
}

#---------- web

function setHtml() {
  sudo rsync -avzP $DIR/html/index.html /var/www/html/
  sudo mkdir -p /var/www/html/apk
  sudo chmod a+rw /var/www/html/apk
}

# rsync apk to bumou:/var/www/html/apk/
function rsyncApk() {
  rsync -avP "$1" bumou:/var/www/html/apk/
}

#---------- Test

function generate_user()
{
prefix="$1"
checkVar prefix
no="$2"
checkVar no
name="$prefix$no"
if [[ "$prefix" == "student" ]]; then
  phone="137111111$no"
  userType="Student"
else
  phone="138111111$no"
  userType="Adult"
fi
cat <<EOF
{
  "Phone":"$phone",
  "Name":"$name",
  "Email":"$name@bumou.com",
  "Password":"$no",
  "UserType":"$userType",
  "SchoolName":"School No. 1",
  "ClassName":"101",
  "TeacherName":"teacher1",
  "Coordinates":"{\"country\":\"China\", \"city\":\"Shanghai\"}"
}
EOF
}

function delStu() {
  # sqlite3 main.db "select * from users"
  sqlite3 main.db "select * from users where name like 'student%' and user_type = 'Student'"
  sqlite3 main.db "delete from users where name like 'student%' and user_type = 'Student'"
}
function addStuOne() {
  no=$1
  checkVar no
  res=$(curl -sf -d "$(generate_user student "$no")" -H "Content-Type: application/json" -X POST http://localhost:58800/api/signup)
  token=$(echo "$res" | jq -r ".Token")
  echoVar token

  res=$(curl -sf -d '{"Date":"2023-10-10T18:00:00Z", "Mood":"Very Good", "Desc":"I am a student, very good"}' -H "Authorization: Bearar ${token}"  -H "Content-Type: application/json" -X POST http://localhost:58800/api/posts)
  res=$(curl -sf -d '{"Date":"2023-10-10T18:05:00Z", "Mood":"Very Bad", "Desc":"I am a student, very bad"}' -H "Authorization: Bearar ${token}"  -H "Content-Type: application/json" -X POST http://localhost:58800/api/posts)
}
function addStu() {
  delStu
  addStuOne 01
  addStuOne 02
  echo "---------- Res:"
  sqlite3 "$DIR"/main.db "select id from users where name='student01';"
}
function updateStuAvatar() {
  no=$1
  checkVar no
  res=$(curl -sf -d "$(generate_user student "$no")" -H "Content-Type: application/json" -X POST http://localhost:58800/api/login)
  token=$(echo "$res" | jq -r ".Token")
  echoVar token

  img="$DIR/../imgs/avatar.jpg"
  res=$(curl -sf -d '{"Avatar":""}' -H "Authorization: Bearar ${token}"  -H "Content-Type: application/json" -X POST http://localhost:58800/api/posts)
}

function delAdu() {
  # sqlite3 main.db "select * from users"
  sqlite3 main.db "select * from users where name like 'adult%' and user_type = 'Adult'"
  sqlite3 main.db "delete from users where name like 'adult%' and user_type = 'Adult'"
}
function addAduOne() {
  no=$1
  checkVar no
  res=$(curl -sf -d "$(generate_user adult "$no")" -H "Content-Type: application/json" -X POST http://localhost:58800/api/signup)
  token=$(echo "$res" | jq -r ".Token")
  echoVar token

  res=$(curl -sf -d '{"Date":"2023-10-10T18:00:00Z", "Mood":"Very Good", "Desc":"I am an adult, very good"}' -H "Authorization: Bearar ${token}"  -H "Content-Type: application/json" -X POST http://localhost:58800/api/posts)
  res=$(curl -sf -d '{"Date":"2023-10-10T18:05:00Z", "Mood":"Very Bad", "Desc":"I am an adult, very bad"}' -H "Authorization: Bearar ${token}"  -H "Content-Type: application/json" -X POST http://localhost:58800/api/posts)
}
function addAdu() {
  delAdu
  addAduOne 01
  addAduOne 02
  sqlite3 "$DIR"/main.db "select id from users where name='adult01';"
}

#----------

function usage() {
  echo "Usage: $0 -h"
}

if [[ $sourced == "y" ]]; then
  return 0
# else
#   exit 0
fi

if [[ $# == 0 ]]; then
  func="default"
  # echo "Usage: $0 FUNC ARGS"
else
  func=$1
  shift
fi

eval "$func $*"

echoGreen "Success!"

