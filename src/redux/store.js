import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from 'redux-logger'
import UserReducer from './userSlice';
import { reducer as LoadingReducer } from '@src/components/appLoading'
import dataApi from '@src/data'

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['UserSlice'],
  blacklist: [dataApi.reducerPath],
};
const rootReducer = combineReducers({
  UserSlice: UserReducer,
  loading: LoadingReducer,
  [dataApi.reducerPath]: dataApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(logger)
      .concat(dataApi.middleware),
});

export const persistor = persistStore(store);
export default store;
