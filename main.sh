#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

(return 0 2>/dev/null) && sourced="y" || sourced="n"

# Note: for scripts to run in e.g. nodejs.exec(), better to remove these err checking
set -o pipefail
set -eE  # same as: `set -o errexit -o errtrace`
trap 'echoRed Error: ' ERR

#----------

function tput2() {
  if [[ -z "$TERM" ]]; then
    export MYTERM="dumb"
  else
    export MYTERM=$TERM
  fi
  TERM=$MYTERM tput $@ || :
}
export -f tput2

function echoRed() {
  fg=$(tput2 setaf 1)
  # bg=$(tput2 setab 9)
  clear=$(tput2 sgr0)
  echo "$fg$@$clear"
}
function echoGreen() {
  fg=$(tput2 setaf 2)
  # bg=$(tput2 setab 9)
  clear=$(tput2 sgr0)
  echo "$fg$@$clear"
}
function echoBlue() {
  fg=$(tput2 setaf 4)
  # bg=$(tput2 setab 9)
  clear=$(tput2 sgr0)
  echo "$fg$@$clear"
}

function echoVar() {
  echo $1: ${!1}
}
function checkVar() {
  if [[ -z "${!1}" ]]; then
    echoRed $1 is empty!
    return 1
  fi
}

if [[ "$debug" == "yes" ]]; then
  # shift
  set -x
fi

if [[ "$(uname)" == "Darwin" ]]; then
  this=$(realpath -q $DIR)
else
  this=$(realpath -e $DIR)
fi
echo $this >/dev/null

#----------

function installApk() {
  find ./android -name "*.apk" -exec ls -lrt {} \;
  adb -s emulator-5554 install $DIR/android/app/build/outputs/apk/debug/app-debug.apk
}

function emu() {
  avd=$1
  if [[ -z "$avd" ]]; then
    $ANDROID_HOME/emulator/emulator -list-avds
  else
    echo $ANDROID_HOME/emulator/emulator -avd $avd
  fi
}

function start() {
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
  post
}

function post() {
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

