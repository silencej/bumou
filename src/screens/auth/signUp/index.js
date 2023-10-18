import React, { useState, useContext, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  Platform,
  PermissionsAndroid,
  // KeyboardAvoidingView,
} from 'react-native';
import styles from './styles';
import Button from '../../../components/button';
import Textinput from '../../../components/input';
import { images } from '../../../assets/images';
import DropDownPicker from 'react-native-dropdown-picker';
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';
// import { KeyboardAvoidingScrollView } from '../../../components/keyboardAvoidingScrollView';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { LoaderContext } from '../../../components/appLoading';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogin } from '../../../redux/userSlice';
import { hp, BEURL } from '../../../constants';
import Geolocation from 'react-native-geolocation-service';
const HERE_API_KEY = 'SAOcCH-dehNHMDT9RaO3ARYATrLgOGjeACGxyY0Fq98';

import {nmlzRes} from '@src/utils'
import { setToken, setProfile } from '@src/redux/userSlice'

import { useSetLoader } from '@src/hooks'

import api from '@src/data'

export default function SignUp (props) {
  const setLoader = useSetLoader()
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [school, setSchool] = useState('');
  const [className, setClassName] = useState('');
  const [teacher, setTeacher] = useState('');
  const [userName, setUserName] = useState('');
  const [open, setOpen] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  // console.log('coordinates:', coordinates);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    { label: 'Student', value: 'Student' },
    { label: 'Adult', value: 'Adult' },
  ]);
  const [signupEnabled, setSignupEnabled] = useState(true)
  const dispatch = useDispatch();
  const position = useRef(new Animated.ValueXY(0, 0)).current;

  const [signupMutation, signupMutationRes] = api.useSignupMutation()
  useEffect(()=>{
    if (signupMutationRes.isError) {
      setSignupEnabled(true)
    }
  }, [signupMutationRes.isError])

  const [setProfileMutation, setProfileMutationRes] = api.useSetProfileMutation()

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
    checkPermission();
    return () => {
      animation.stop();
    };
  }, []);
  const checkPermission = async () => {
    setLoader(true);
    if(Platform.OS === 'ios') {
      await Geolocation.requestAuthorization('whenInUse').then(() => {
        fetchCoordinates();
      });
    } else {
      handleAndroidPermission();
    }
  };
  const handleAndroidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Address Picker Location Permission',
          message: 'Address Picker needs access to your location ',
        },
      );
      if(granted === PermissionsAndroid.RESULTS.GRANTED) {
        fetchCoordinates();
      } else {
        alert('Location Permission Not Granted');
      }
    } catch(err) {
      setLoader(false);
      console.warn(err);
    }
  };
  const fetchCoordinates = () => {
    Geolocation.getCurrentPosition(
      position => {
        let body = {
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude,
        };
        getAddressFromCoordinates(body);
        setLoader(false);
      },
      error => {
        setLoader(false);
        console.log('error', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };
  const getAddressFromCoordinates = body => {
    const { latitude, longitude } = body;
    return new Promise(resolve => {
      const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=12af96acc6d844caa9083d967d6b7a75`;
      fetch(url)
        .then(res => res.json())
        .then(resJson => {
          console.log(
            '🚀 ~ file: index.js:111 ~ .then ~ resJson:',
            resJson?.features[0],
          );
          // the response had a deeply nested structure :/
          if(resJson?.features[0]?.properties?.country) {
            setCoordinates({
              ...body,
              ...resJson?.features[0]?.properties,
            });
          }
        })
        .catch(e => {
          console.log('Error in getAddressFromCoordinates', e);
          resolve();
        });
    });
  };

  useEffect(()=>{
    const data = signupMutationRes.data
    if (!data) return
    if (!data?.Token) {
      alert("Fail to get token, signup fails")
      return
    }
    // dispatch(setToken(data.Token))
    dispatch(setProfile(data))
  }, [signupMutationRes.data])

  const signUpFun = async () => {
    setLoader(true);
    setSignupEnabled(false)

    const finalEmail = email === '' ? userName + '@bumou.com' : email !== '' ? email : null

    const studentObj = {
      Email: finalEmail,
      Name: userName,
      SchoolName: school,
      ClassName: className,
      TeacherName: teacher,
      UserType: value,
      Phone: mobileNo,
      Coordinates: JSON.stringify(coordinates),
    };
    const adultObj = {
      Name: userName,
      Email: finalEmail,
      Phone: mobileNo,
      UserType: value,
      Coordinates: JSON.stringify(coordinates),
    };
    const selectedObj = value === 'Student' ? studentObj : adultObj

    signupMutation({
      email: finalEmail,
      password,
      ...selectedObj
    })

    // try {
    //  const res = await
    // let response = await fetch(`${BEURL}/signup`, {
    //   method: `POST`,
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email: finalEmail,
    //     password,
    //   })
    // });

    // let res = await response.json()
    // if (res === "DB error: UNIQUE constraint failed: users.email") {
    //   throw 'The email address is already in use by another account.'
    // }
    // if (!!res.error) throw res.error
    // if (!response.ok) {
    //   console.error(res)
    //   throw "Login failed!"
    // }
    //
    // let json = nmlzRes(res);
    //
    // console.log(`signup res: `, JSON.stringify(json, null, 2))
    // TODO: save token, save profile, redirect to homepage.

    // Save profile
    // response = await fetch(`${BEURL}/profile`, {
    //   method: `POST`,
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${json.Token}`,
    //   },
    //   body: JSON.stringify(selectedObj)
    // });
    // json = nmlzRes(await response.json());
    // console.log(`Profile res: `, JSON.stringify(json, null, 2))
    //   const setProfileRes = await setProfileMutation(selectedObj)
    //   setLoader(false)
    //   dispatch(setProfile(selectedObj))
    // } catch (error) {
    //   console.error(error);
    //   if ("Network request failed" === error?.message) {
    //     alert(`Network error! ${BEURL}, ${Object.keys(error)}`)
    //   } else {
    //     alert(error)
    //   }
    //   setLoader(false)
    //   setSignupEnabled(true)
    // }

    // ait auth()
    // .createUserWithEmailAndPassword(
    //   email === '' ? userName + '@bumou.com' : email !== '' ? email : null,
    //   password,
    // )
    // .then(() => {
    //   const userId = auth().currentUser.uid;
    //   const studentObj = {
    //     uid: userId,
    //     email: email === '' ? userName + '@bumou.com' : email,
    //     userName: userName,
    //     schoolName: school,
    //     className: className,
    //     teacherName: teacher,
    //     userType: value,
    //     mobileNo: mobileNo,
    //     coordinates,
    //   };
    //   const adultObj = {
    //     uid: userId,
    //     userName: userName,
    //     email: email === '' ? userName + '@bumou.com' : email,
    //     mobileNo: mobileNo,
    //     userType: value,
    //     coordinates,
    //   };
    //   const selectedObj = value === 'Student' ? studentObj : adultObj;
    //   firestore().collection('users').doc(userId).set(selectedObj);
    //   console.log('user Added');
    //   setLoader(false);
    //   dispatch(setIsLogin(true));
    // })
    // .catch(error => {
    //   setLoader(false);
    //   if(error.code === 'auth/email-already-in-use') {
    //     alert('The email address is already in use by another account.');
    //   } else if(error.code === 'auth/invalid-email') {
    //     alert(
    //       'The provided email address is invalid or improperly formatted.',
    //     );
    //   } else {
    //     alert('Something went wrong.Please try again');
    //   }
    // });
  };
  const dotStyle = {
    transform: position.getTranslateTransform(),
    width: hp(4),
    height: hp(4),
    borderRadius: hp(2),
    backgroundColor: '#FF4475',
  };

  // const handleTextChange = text => {
  //   const randomNum1 = Math.floor(Math.random() * 10);
  //   const randomNum2 = Math.floor(Math.random() * 10);

  //   const suggestion1 = `${text}${randomNum1}@gmail.com`;
  //   const suggestion2 = `${text}${randomNum2}@gmail.com`;
  //   const suggestion3 = text + '@gmail.com';
  //   setEmailSuggestions([suggestion1, suggestion2, suggestion3]);
  //   setEmail(text);
  // };

  /* behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
     isScroll={true} */

  return (
    <View style={ styles.container }>
      <View style={ styles.inputContainer }>
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
        <Text style={ styles.txtLogin }>Sign Up</Text>
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
          />
        </View>
        <KeyboardAwareScrollView
        >
          { value === 'Student' ? (
              <>
                <Textinput
                  style={ styles.inputContainer }
                  editable={ false }
                  placeholder="Country"
                  value={ coordinates?.country }
                />
                <Textinput
                  editable={ false }
                  placeholder="City"
                  value={ coordinates?.city }
                />
                <Textinput
                  value={ school }
                  placeholder="School Name"
                  onChangeText={ val => setSchool(val) }
                />
                <Textinput
                  value={ className }
                  placeholder="Class Name"
                  onChangeText={ val => setClassName(val) }
                />
                <Textinput
                  value={ teacher }
                  placeholder="Teacher Name"
                  onChangeText={ val => setTeacher(val) }
                />
                <Textinput
                  placeholder="Mobile No"
                  keyboardType="phone-pad"
                  value={ mobileNo }
                  onChangeText={ val => setMobileNo(val) }
                />
                <Textinput
                  placeholder="Username"
                  value={ userName }
                  onChangeText={ val => setUserName(val) }
                />
                <Textinput
                  value={ email }
                  placeholder="Email (Optional)"
                  onChangeText={ val => setEmail(val) }
                  // onFocus={() => {
                    //   setIsFocus(true);
                    // }}
                  // onBlur={() => {
                    //   setIsFocus(false);
                    // }}
                />
                {/* {isFocus === true && email !== '' ? (
                    <View>
                    <View
                    style={ {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    } }>
                    <View style={ styles.emailTxtView }>
                    { isFocus === true && email !== '' ? (
                    <TouchableOpacity
                    onPress={ () => {
                    setEmail(emailSuggestions[2]);
                    } }>
                    <Text style={ styles.emailTxt }>
                    { '\u2B25' } { emailSuggestions[2] }
                    </Text>
                    </TouchableOpacity>
                    ) : null }
                    </View>
                    <View style={ styles.emailTxtView }>
                    { isFocus === true && email !== '' ? (
                    <TouchableOpacity
                    onPress={ () => {
                    setEmail(emailSuggestions[0]);
                    } }>
                    <Text style={ styles.emailTxt }>
                    { '\u2B25' } { emailSuggestions[0] }
                    </Text>
                    </TouchableOpacity>
                    ) : null }
                    </View>
                    </View>

                    <View style={ { ...styles.emailTxtView, marginTop: 5 } }>
                    { isFocus === true && email !== '' ? (
                    <TouchableOpacity
                    onPress={ () => {
                    setEmail(emailSuggestions[1]);
                    } }>
                    <Text style={ styles.emailTxt }>
                    { '\u2B25' } { emailSuggestions[1] }
                    </Text>
                    </TouchableOpacity>
                    ) : null }
                    </View>
                    </View>
                    ) : null} */}
                <Textinput
                  placeholder="Password"
                  value={ password }
                  onChangeText={ val => setPassword(val) }
                  secureTextEntry={ true }
                />
              </>
          ) : value === 'Adult' ? (
              <>
                <Textinput
                  editable={ false }
                  placeholder="Country"
                  value={ coordinates?.country }
                />
                <Textinput
                  editable={ false }
                  placeholder="City"
                  value={ coordinates?.city }
                />
                <Textinput
                  placeholder="Mobile No"
                  keyboardType="phone-pad"
                  value={ mobileNo }
                  onChangeText={ val => setMobileNo(val) }
                />
                <Textinput
                  placeholder="username"
                  value={ userName }
                  onChangeText={ val => setUserName(val) }
                />
                <Textinput
                  value={ email }
                  placeholder="Email (Optional)"
                  onChangeText={ val => setEmail(val) }
                  // onFocus={() => {
                    //   setIsFocus(true);
                    // }}
                  // onBlur={() => {
                    //   setIsFocus(false);
                    // }}
                />
                {/* {isFocus === true && email !== '' ? (
                    <View>
                    <View
                    style={ {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    } }>
                    <View style={ styles.emailTxtView }>
                    { isFocus === true && email !== '' ? (
                    <TouchableOpacity
                    onPress={ () => {
                    setEmail(emailSuggestions[2]);
                    } }>
                    <Text style={ styles.emailTxt }>
                    { '\u2B25' } { emailSuggestions[2] }
                    </Text>
                    </TouchableOpacity>
                    ) : null }
                    </View>
                    <View style={ styles.emailTxtView }>
                    { isFocus === true && email !== '' ? (
                    <TouchableOpacity
                    onPress={ () => {
                    setEmail(emailSuggestions[0]);
                    } }>
                    <Text style={ styles.emailTxt }>
                    { '\u2B25' } { emailSuggestions[0] }
                    </Text>
                    </TouchableOpacity>
                    ) : null }
                    </View>
                    </View>

                    <View style={ { ...styles.emailTxtView, marginTop: 5 } }>
                    { isFocus === true && email !== '' ? (
                    <TouchableOpacity
                    onPress={ () => {
                    setEmail(emailSuggestions[1]);
                    } }>
                    <Text style={ styles.emailTxt }>
                    { '\u2B25' } { emailSuggestions[1] }
                    </Text>
                    </TouchableOpacity>
                    ) : null }
                    </View>
                    </View>
                    ) : null} */}

                <Textinput
                  placeholder="password"
                  onChangeText={ val => setPassword(val) }
                  secureTextEntry={ true }
                  value={ password }
                />
              </>
          ) : null }
        </KeyboardAwareScrollView>
        <Button
          title="Sign Up"
          enabled={signupEnabled}
          onPress={ () => {
            if(value === '') {
              alert('Please select category');
            } else if(mobileNo === '') {
              alert('Please enter mobile no');
            } else if(email === '' && userName === '') {
              alert('Please enter username');
            } else if(password === '') {
              alert('Please enter password');
            } else if(email !== '' && !email.match(/.*@.*\..*/)) {
              alert('Please enter valid email');
            } else {
              signUpFun();
            }
          } }
        />
      </View>
    </View>
  );
}

