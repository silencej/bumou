import React, {useContext, useRef, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import {images} from '../../../assets/images';
import Textinput from '../../../components/input';
import Button from '../../../components/button';
import {KeyboardAvoidingScrollView} from '../../../components/keyboardAvoidingScrollView';
import {useDispatch, useSelector} from 'react-redux';
import {setIsLogin} from '../../../redux/userSlice';
// import {LoaderContext} from '../../../components/appLoading';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

import { useSetLoader } from '@src/hooks'

const VerifyOtp = props => {
  const {res, phone, value} = props.route.params;

  const dispatch = useDispatch();
  const setLoader = useSetLoader()
  const [otp, setOtp] = useState(null);

  //   const confirmCode = async () => {
  //     setLoader(true);

  //     try {
  //       await res.confirm(otp).then(()=>{

  //       })
  //     } catch (error) {
  //       console.log('Invalid code.', error.message);
  //     }
  //   };

  const confirmOtp = async () => {
    // setLoader(true);
    // await res
    //   .confirm(otp)
    //   .then(async response => {
    //     console.log('response', response);
    //     const userId = auth().currentUser.uid;
    //     firestore().collection('users').doc(userId).set({
    //       uid: userId,
    //       mobileNo: phone,
    //       userType: value,
    //       email,
    //     });
    //     setLoader(false);
    //     dispatch(setIsLogin(true));
    //   })
    //   .catch(err => {
    //     setLoader(false);
    //     alert(err.message);
    //   });
  };

  return (
    <KeyboardAvoidingScrollView>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image
            source={images.logo}
            style={styles.logoImg}
            resizeMode="contain"
          />
          <Image
            source={images.lockIcon}
            style={styles.lockIconImg}
            resizeMode="contain"
          />
          <Text style={styles.txtLogin}>OTP Verification</Text>
          <View style={styles.inputView}>
            <Textinput
              placeholder="Enter OTP"
              onChangeText={val => setOtp(val)}
              keyboardType="numeric"
            />
          </View>
          <Button
            title="Verify OTP"
            onPress={() => {
              confirmOtp();
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingScrollView>
  );
};
export default VerifyOtp;
