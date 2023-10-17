#!/bin/bash

shopt -s nullglob

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

#---------- iOS

prepi() {
  sudo gem install cocoapods ; cd ios ; bundle install ; bundle exec pod install
  # brew upgrade cocoapods
}

buildi() {
  xcodebuild -workspace "$DIR"/ios/BUMOU.xcworkspace -configuration Debug -scheme BUMOU
# -destination id=CB20AA32-ABC0-47FA-80E3-38312B5946F5
}

#---------- Android

function installApk() {
  find ./android -name "*.apk" -exec ls -lrt {} \;
  adb -s emulator-5554 install "$DIR"/android/app/build/outputs/apk/debug/app-debug.apk
}

function emu() {
  avd=$1
  if [[ -z "$avd" ]]; then
    "$ANDROID_HOME"/emulator/emulator -list-avds
  else
    echo "$ANDROID_HOME"/emulator/emulator -avd "$avd"
  fi
}

function starta() {
  app=com.bumou
  adb -s emulator-5554 shell am force-stop $app
  adb -s emulator-5554 shell am start -n $app/$app.MainActivity
}

function debuga() {
  pushd "$DIR/android"
  ENVFILE=.env
  cat ./app/src/main/AndroidManifest.xml
  bash ./gradlew bundleDebug
  bash ./gradlew assembleDebug
  find . -name "*.apk" -exec ls -lrt {} \;
  popd
  # pushd "$DIR/ios"
  # bundle install
  # bundle exec pod install
  # popd
}

jks=owen@bumou.jks
function proda() {
  ENVFILE=.env.prod
  yarn touchRN
  # yarn react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

  pushd "$DIR/android"
  cat ./app/src/main/AndroidManifest.xml
  bash ./gradlew bundleRelease
  bash ./gradlew assembleRelease
  find . -name "*.apk" -exec ls -lrt {} \;

  # Check signing
  keytool -printcert -jarfile app/build/outputs/bundle/release/app-release.aab
  # keytool -list -v -keystore app/$jks
  popd
  posta
}

function posta() {
  cp "$DIR"/android/app/build/outputs/apk/release/app-release.apk "$DIR/bumou-v0.0.1-$(date '+%Y%m%d-%H%M%S').apk"
}


#----------

func="default"
if [[ $# == 0 ]]; then
  echo "Usage: $0 FUNC ARGS"
  if [[ $sourced == "y" ]]; then
    return 0
  else
    exit 0
  fi
else
  func=$1
  shift
fi

eval "$func $*"

echoGreen "Success!"

