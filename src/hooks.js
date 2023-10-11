
import { useContext } from 'react'
import { useSelector, useDispatch, } from 'react-redux'
import { selectToken, setToken, } from '@src/redux/userSlice'

import {useSetLoading} from '@src/components/appLoading'

import deepmerge from 'deepmerge'

import { BEURL } from '@src/constants'

// Use throughout your app instead of plain `useDispatch` and `useSelector`

export function useSetLoader() {
  const setLoading = useSetLoading()
  return (isLoading)=>{
    if (isLoading) setLoading('Loading')
    else setLoading('')
  }
}

export function useFetch() {
  const token = useSelector(selectToken)
  const setLoader = useSetLoader()
  const dispatch = useDispatch()
  return async (req, config={}) => {
    setLoader(true)
    const resConfig = deepmerge(config, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })

    let url = req
    if (req.startsWith("/")) {
      url = `${BEURL}${req}`
    }

    try {
      const response = await fetch(url, resConfig)

      console.log("response status: ", response.status)

      // When 403, the http response body may have nothing.
      if (response.status === 403) {
        alert("You are unauthorized, please login again")
        dispatch(setToken(''))
        throw "Request failed!"
      }

      // Other than 403, we always return a json in the response body.
      const res = await response.json()
      if (!response.ok) {
        console.error(res)
        throw "Request failed!"
      }

      // if (res === `DB error: record not found`) {
      //   throw "Login failed!"
      // }

      setLoader(false)
      return res

    } catch (error) {
      console.error(`Error while fetching ${url}`)
      console.error(error)
      if ("Network request failed" === error?.message) {
        alert("Network error!")
        // setSignupEnabled(true)
      } else {
        alert(error)
      }
      setLoader(false)
      throw error
      return null
    }
  }
}
