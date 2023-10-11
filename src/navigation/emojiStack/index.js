import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Emoji from '../../screens/main/emoji';
import MoodWeek from '../../screens/main/moodWeek';
import EmojiDetail from '../../screens/main/emojiDetail';
const EmojiStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Emoji"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Emoji" component={Emoji} />
      <Stack.Screen name="EmojiDetail" component={EmojiDetail} />
      {/* <Stack.Screen name="MoodWeek" component={MoodWeek} /> */}
    </Stack.Navigator>
  );
};
export default EmojiStack;
