
import { DateTime } from 'luxon'

export function formatDatetime(iso) {
  return DateTime.fromISO(iso).setZone('Asia/Shanghai').toFormat("yyyy'-'LL'-'dd HH:mm:ss")
}

export function nmlzRes(res) {
  let output = {}
  for (const p in res) {
    if (['string', 'number'].includes(typeof res[p])) {
      output[p] = res[p]
      continue
    }
    if (!res[p]) {
      output[p] = null
      continue
    }
    if (res[p].hasOwnProperty('String')) {
      output[p] = res[p].String
      continue
    }
    console.error(`Can't parse ${p}: ${res[p]}`)
    output[p] = null
  }
  return output
}
