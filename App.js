import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './src/navigation/bottomTab';
import { LogBox, SafeAreaView } from 'react-native';
// import { LoaderProvider } from './src/components/appLoading';
import AuthStack from './src/navigation/authStack';
import { navigationRef } from './src/navigation/navigationRef';
import { useSelector } from 'react-redux';
// import {useDispatch, useSelector} from 'react-redux';

import 'react-native-gesture-handler'

import {
  selectIsLogin,
} from '@src/redux/userSlice'

import { BEURL } from '@src/constants'
import config from 'react-native-config'

if (config.ENV !== 'dev') {
  LogBox.ignoreLogs([
    'ViewPropTypes will be removed',
    'ColorPropType will be removed',
  ]);
  LogBox.ignoreAllLogs();
}

const App = () => {
  // const Stack = createNativeStackNavigator();
  // const UserSlice = useSelector(state => state.UserSlice);
  const isLogin = useSelector(selectIsLogin)
  console.log('isLogin', isLogin)

  // React.useEffect(()=>{
  //   alert(`BEURL: ${BEURL}`)
  // }, [])

  return (
    <>
      <SafeAreaView />
      <NavigationContainer ref={ navigationRef }>
        {/* <Stack.Navigator
            initialRouteName="authStack"
            screenOptions={{
            headerShown: false,
            }}>
            <Stack.Screen name="bottomStack" component={BottomTab} />
            <Stack.Screen name="authStack" component={AuthStack} /> */}
        { isLogin === true ? <BottomTab /> : <AuthStack /> }
        {/* </Stack.Navigator> */ }
      </NavigationContainer>
    </>
  );
};

export default App;
