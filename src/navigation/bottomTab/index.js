import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Image } from 'react-native';
import { images } from '../../assets/images';
import { hp, wp, rhp, IS_IPHONE, IS_IPHONE_X } from '../../constants';
import Help from '../../screens/main/helpCenter';
import ShareMoments from '../../screens/main/shareMoments';
import EmojiStack from '../emojiStack';
import ChatStack from '../chatStack';
import MoodWeek from '../../screens/main/moodWeek';
import Profile from '../../screens/main/profile';
import EmojiDetail from '../../screens/main/emojiDetail';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Emoji"
      screenOptions={ {
        tabBarActiveTintColor: '#FF4475',
        headerShown: false,
        // tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: IS_IPHONE_X ? hp(10) : hp(8),
          position: 'absolute',
          bottom: 0,
          // backgroundColor: "red"
        },
      } }>
      <Tab.Screen
        name="Profile"
        component={ Profile }
        options={ {
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {
            fontSize: rhp(14),
            color: '#000000',
            fontWeight: '600',
            marginBottom: IS_IPHONE ? 0 : hp(1),
          },
          tabBarIcon: ({ focused }) => (
            <Image
              source={ images.userProfile }
              style={ {
                resizeMode: 'contain',
                height: hp(2.6),
                width: hp(2.6),
                tintColor: focused ? '#FF4475' : '#000000',
              } }
            />
          ),
        } }
      />

      <Tab.Screen
        name="EmojiStack"
        component={ EmojiStack }
        options={ {
          tabBarLabel: 'Emoji',
          tabBarLabelStyle: {
            fontSize: rhp(14),
            color: '#000000',
            fontWeight: '600',
            marginBottom: IS_IPHONE ? 0 : hp(1),
          },
          tabBarIcon: ({ focused }) => (
            <Image
              source={ images.emoji }
              style={ {
                resizeMode: 'contain',
                height: hp(2.5),
                width: hp(2.5),
                tintColor: focused ? '#FF4475' : '#000000',
              } }
            />
          ),
        } }
      />

      <Tab.Screen
        name="Chart"
        component={ MoodWeek }
        options={ {
          tabBarLabel: 'Chart',
          tabBarLabelStyle: {
            fontSize: rhp(14),
            color: '#000000',
            fontWeight: '600',
            marginBottom: IS_IPHONE ? 0 : hp(1),
          },
          tabBarIcon: ({ focused }) => (
            <Image
              source={ images.chart }
              style={ {
                resizeMode: 'contain',
                height: hp(2.5),
                width: hp(2.5),
                tintColor: focused ? '#FF4475' : '#000000',
              } }
            />
          ),
        } }
      />

      <Tab.Screen
        name="ChatStack"
        component={ ChatStack }
        options={ {
          tabBarLabel: 'Chat',
          tabBarLabelStyle: {
            fontSize: rhp(14),
            color: '#000000',
            fontWeight: '600',
            marginBottom: IS_IPHONE ? 0 : hp(1),
          },
          tabBarIcon: ({ focused }) => (
            <Image
              source={ images.chat }
              style={ {
                height: hp(2.5),
                width: hp(2.5),
                tintColor: focused ? '#FF4475' : '#000000',
              } }
            />
          ),
        } }
      />

      <Tab.Screen
        name="Share"
        component={ ShareMoments }
        options={ {
          tabBarLabel: 'Score',
          tabBarLabelStyle: {
            fontSize: rhp(14),
            color: '#000000',
            fontWeight: '600',
            width: wp(30),
            marginBottom: IS_IPHONE ? 0 : hp(1),
          },
          tabBarIcon: ({ focused }) => (
            <Image
              source={ images.scoreIcon }
              style={ {
                height: hp(3),
                width: hp(3),
                tintColor: focused ? '#FF4475' : '#000000',
              } }
            />
          ),
        } }
      />

      <Tab.Screen
        name="Post"
        component={ EmojiDetail }
        options={ {
          tabBarLabel: 'Moments',
          tabBarLabelStyle: {
            fontSize: rhp(14),
            color: '#000000',
            fontWeight: '600',
            width: wp(30),
            marginBottom: IS_IPHONE ? 0 : hp(1),
          },
          tabBarIcon: ({ focused }) => (
            <Image
              source={ images.share }
              style={ {
                height: hp(2.5),
                width: hp(2.5),
                tintColor: focused ? '#FF4475' : '#000000',
              } }
            />
          ),
        } }
      />

      <Tab.Screen
        name="Help"
        component={ Help }
        options={ {
          tabBarLabel: 'Help',
          tabBarLabelStyle: {
            fontSize: rhp(14),
            color: '#000000',
            fontWeight: '600',
            marginBottom: IS_IPHONE ? 0 : hp(1),
          },
          tabBarIcon: ({ focused }) => (
            <Image
              source={ images.help }
              style={ {
                height: hp(2.5),
                width: hp(2.5),
                tintColor: focused ? '#FF4475' : '#000000',
              } }
            />
          ),
        } }
      />
    </Tab.Navigator>
  );
};
export default BottomTab;
