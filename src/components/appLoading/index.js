import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';
import {ActivityIndicator, Dimensions, Modal, Text, View} from 'react-native';

//---------- Slice

const initialState : DataType = {
  data: "",
}
export const slice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

const selectData = (state) => state.loading.data;
export function useSelectLoading() {
  return useSelector(selectData)
}
const {
  setData,
} = slice.actions;
export function useSetLoading() {
  const dispatch = useDispatch()
  return (data : string) => {
    dispatch(setData(data))
  }
}

export const actions = slice.actions;
export const reducer = slice.reducer;

//---------- Component

export const LoaderProvider = ({showLoader, children}) => {
  // const [loader, setLoader] = useState(false);
  const loading = useSelectLoading()
  const loader = loading !== ''

  return (
    <>
      <View>
        <Modal transparent={true} onRequestClose={() => null} visible={loader}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#00000070',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 25,
              }}>
              <ActivityIndicator size="large" color={'#FE4E8C'} />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '200',
                  color: '#030031',
                  opacity: 1,
                }}>
                {loading}
              </Text>
            </View>
          </View>
        </Modal>
      </View>
      {children}
    </>
  );
};
