import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Login from '../../screens/auth/login';
import Splash from '../../screens/splash';
import SignUp from '../../screens/auth/signUp';
import VerifyOtp from '../../screens/auth/verifyOtp';

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
    </Stack.Navigator>
  );
};
export default AuthStack;
