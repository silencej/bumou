
import {
  Platform,
} from 'react-native'
import colors from './colors'
import {
  IS_IPHONE,
  IS_IPHONE_X,
  height,
  hp,
  rfs,
  rhp,
  rwp,
  width,
  wp,
} from './dimensions';

import config from 'react-native-config'

console.log('config: ', config)

// Android
let BEURL = `http://10.0.2.2:58800`

// iOS
if (Platform.OS === 'ios') {
  console.log(`Platform.OS: `, Platform.OS)
  BEURL = `http://localhost:58800`
}

// Demo
if (config.ENV === 'stg') {
  BEURL = `https://bumou.space`
}
if (config.ENV === 'prd') {
  BEURL = `https://bumou.space`
}
// BEURL = `https://bumou.space`

// const BEURL = config.BEURL
// BEURL = BEURL.endsWith("/") ? `${BEURL}` : `${BEURL}/`
BEURL=`${BEURL}/api`

console.log(`BEURL: `, BEURL)

export {colors, IS_IPHONE, IS_IPHONE_X, height, hp, rfs, rhp, rwp, width, wp, BEURL};
