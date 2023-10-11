import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Chat from '../../screens/main/chat';
import Messeges from '../../screens/main/messeges';
const ChatStack = ({navigation, route}) => {
  React.useLayoutEffect(() => {
      // const routeName = getFocusedRouteNameFromRoute(route);
      const routeName = route.name
      console.log(`route`, route)
      //if (routeName === "Messeges"){
          navigation.setOptions({tabBarVisible: false});
      //}else {
          //navigation.setOptions({tabBarVisible: true});
      //}
  }, [navigation, route]);

  return (
    <Stack.Navigator
      initialRouteName="Chat"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Messeges" component={Messeges} />
    </Stack.Navigator>
  );
};
export default ChatStack;
