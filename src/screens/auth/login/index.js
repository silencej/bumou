import React, { useContext, useRef, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, Alert } from 'react-native';

import {
  useCounter,
} from 'usehooks-ts'

import styles from './styles';
import { images } from '../../../assets/images';
import Textinput from '../../../components/input';
import DropDownPicker from 'react-native-dropdown-picker';
import Button from '../../../components/button';
// import { KeyboardAvoidingScrollView } from '../../../components/keyboardAvoidingScrollView';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '@src/redux/userSlice';
// import { LoaderContext } from '../../../components/appLoading';
// import { useSetLoader } from '@src/hooks'
import { hp, BEURL } from '@src/constants';

import api from '@src/data'

export default function Login (props) {
  const phoneInput = useRef(null);
  const dispatch = useDispatch();
  // const setLoader = useSetLoader();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    { label: 'Student', value: 'Student' },
    { label: 'Adult', value: 'Adult' },
  ]);
  const position = useRef(new Animated.ValueXY(0, 0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(position, {
          toValue: { x: -65, y: -65 },
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(position, {
          toValue: { x: 0, y: 0 },
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, []);
  const isValidEmail = (email) => {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const [loginMutation, loginMutationRes] = api.useLoginMutation()

  useEffect(()=>{
    if (!loginMutationRes.data) return
    dispatch(setProfile(loginMutationRes.data))
  }, [loginMutationRes.data])

  const debugCount = 6
  const {count, increment} = useCounter(0)

  const logInFun = async () => {
    // setLoader(true);
    const isValid = isValidEmail(email);
    let username = email;
    if(!isValid) {
      username = `${email}@bumou.com`;
    }
    // console.log("🚀 ~ file: index.js:65 ~ logInFun ~ username:", username);
    // console.log(`BEURL: `, BEURL)

    loginMutation({
        UserType: value,
        Email: username,
        Password: password,
      })
    // setLoader(false)

    // try {
    //   // let response = await fetch(`${BEURL}/login`, {
    //   //   method: `POST`,
    //   //   headers: {
    //   //     Accept: 'application/json',
    //   //     'Content-Type': 'application/json',
    //   //   },
    //   //   body: JSON.stringify({
    //   //     UserType: value,
    //   //     Email: username,
    //   //     Password: password,
    //   //   })
    //   // });
    //   //
    //   // let res = await response.json()
    //   // if (res === `DB error: record not found`) {
    //   //   throw "Login failed!"
    //   // }
    //   // if (!response.ok) {
    //   //   console.error(res)
    //   //   throw "Login failed!"
    //   // }
    // 
    //   // console.log("api.util: ", api.util)
    //   // dispatch(api.util.resetApiState())
    // } catch (error) {
    //   if ("Network request failed" === error?.message) {
    //     alert("Network error!")
    //     // setSignupEnabled(true)
    //   } else {
    //     alert(error)
    //   }
    //   setLoader(false)
    //   console.error(error);
    // }

    // auth()
    //   .signInWithEmailAndPassword(username, password)
    //   .then(() => {
    //     setLoader(false);
    //     dispatch(setIsLogin(true));
    //   })
    //   .catch(error => {
    //     setLoader(false);
    //     if(error.code === 'auth/invalid-email') {
    //       Alert.alert(
    //         'The provided username is invalid.',
    //       );
    //     } else if(error.code === 'auth/user-not-found') {
    //       Alert.alert(
    //         'No user record exists corresponding to the provided username.',
    //       );
    //     } else if(error.code === 'auth/wrong-password') {
    //       Alert.alert(
    //         'The provided password is incorrect for the given username.',
    //       );
    //     } else {
    //       Alert.alert('Something went wrong.Please try again');
    //     }
    //     // alert(error.message);
    //   });
  };

  const dotStyle = {
    transform: position.getTranslateTransform(),
    width: hp(4),
    height: hp(4),
    borderRadius: hp(2),
    backgroundColor: '#FF4475',
  };

  return (
    <KeyboardAwareScrollView>
      <View style={ styles.container }>
        <TouchableOpacity
          onPress={()=>increment()}
        >
          <View
            style={ styles.inputContainer }
          >
            <View>
              <Image
                source={ images.logo }
                style={ styles.logoImg }
                resizeMode="contain"
              />
              <View style={ styles.dot }>
                <Animated.View style={ [dotStyle] } />
              </View>
            </View>
            {/* <Image
                source={images.lockIcon}
                style={styles.lockIconImg}
                resizeMode="contain"
                /> */}
            <Text style={ styles.txtLogin }>Log In</Text>
            <View style={ styles.pickerView }>
              <DropDownPicker
                open={ open }
                value={ value }
                items={ items }
                setOpen={ setOpen }
                setValue={ setValue }
                setItems={ setItems }
                style={ { borderColor: '#fff' } }
                placeholder="Category"
                listMode="SCROLLVIEW"
              />
            </View>
            {/* {value === 'Student' ? ( */ }
            { !!value && <>
              <Textinput
                placeholder="Username"
                value={ email }
                onChangeText={ val => setEmail(val) }
              />
              <Textinput
                placeholder="Password"
                secureTextEntry={true}
                value={ password }
                onChangeText={ val => setPassword(val) }
              />
            </> }
            {/* ) : value === 'Adult' ? (
                <>
                <Textinput
                placeholder="Username"
                // keyboardType="phone-pad"
                onChangeText={val => setEmail(val)}
                />
                <Textinput
                placeholder="Password"
                secureTextEntry={true}
                // keyboardType="phone-pad"
                onChangeText={val => setPassword(val)}
                />
                </>
                ) : null} */}

            <Button
              title="Log in"
              onPress={ () => {
                if(value === '') {
                  Alert.alert("", 'Please select category');
                } else if(email === '') {
                  Alert.alert("", 'Please enter username');
                } else if(password === '') {
                  Alert.alert("", 'Please enter password');
                } else {
                  logInFun();
                }
              } }
            />
            <TouchableOpacity
              style={ styles.bottomTxtView }
              onPress={ () => props.navigation.navigate('SignUp') }>
              <Text style={ styles.txtDont }>Don't have an account? </Text>
              <Text style={ styles.txtSignUp }> Sign Up</Text>
            </TouchableOpacity>
            {count >= debugCount && <View>
              <Text style={styles.txtBEURL}>BEURL: {BEURL}</Text>
            </View> }
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  )
}

