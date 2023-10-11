import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit'
import { navigateReset } from '../navigation/navigationRef';
// import jwt from 'jsonwebtoken'

const userSlice = createSlice({
  name: 'UserSlice',
  initialState: {
    isFirst: null,
    isLogin: null,
    ID: '',
    Token: '',
    Phone: '',
	  Name: '',
	  Email: '',
	  Password: '',
	  UserType: '',
	  SchoolName: '',
	  ClassName: '',
	  TeacherName: '',
	  Coordinates: '',
  },
  reducers: {
    setIsFirst: (state, action) => {
      state.isFirst = action?.payload;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action?.payload;
      if(action?.payload) {
        setTimeout(() => {
          navigateReset("bottomStack");
        }, 200);
      }
    },
    setToken: (state, action) => {
      state.Token = action?.payload
    },
    setProfile: (state, action) => {
      for (const p in action?.payload) {
        state[p] = action?.payload[p]
      }
    },
  },
});

export const selectToken = state => state.UserSlice.Token
export const selectProfile = state => state.UserSlice
export const selectCoord = createSelector(state=>state.UserSlice.Coordinates, coord => {
  if (coord === '') return {}
  const co = JSON.parse(coord)
  return co
})
export const selectIsLogin = state => {
  if (state.UserSlice.Token === '') return false
  // try {
  //   jwt.verify(state.UserSlice.Token, 'sec')
  // } catch (error) {
  //   if (error.Name === 'TokenExpiredError') {
  //     return false
  //   }
  //   return true
  // }
  return true
}

export const {
  setIsFirst,
  setIsLogin,
  setToken,
  setProfile,
} = userSlice.actions;
export default userSlice.reducer;
