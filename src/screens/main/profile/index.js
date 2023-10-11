import React, {useContext, useEffect, useState} from 'react';
import {Text, View, Image} from 'react-native';
import styles from './styles';
import {images} from '@src/assets/images';
import Button from '@src/components/button';
// import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
// import firestore from '@react-native-firebase/firestore';
import {setIsLogin} from '../../../redux/userSlice';
import {hp} from '../../../constants';

import {
  selectProfile,
  selectCoord,
  setToken,
} from '@src/redux/userSlice'

import {
  useSetLoader,
} from '@src/hooks'

import api from '@src/data'

const Profile = () => {
  const setLoader = useSetLoader();
  // const [userData, setUserData] = useState(null);
  const userData = useSelector(selectProfile)
  const coordinates = useSelector(selectCoord)
  // console.log('coordinates', coordinates)
  const dispatch = useDispatch();

  // useEffect(() => {
  //   getUserData();
  // }, []);

  // const getUserData = async () => {
  //   setLoader(true);
  //   const uid = auth().currentUser.uid;
  //   await firestore()
  //     .collection('users')
  //     .doc(uid)
  //     .get()
  //     .then(documentSnapshot => {
  //       setUserData(documentSnapshot._data);
  //       setLoader(false);
  //     })
  //     .catch(e => {
  //       setLoader(false);
  //       console.log(e);
  //     });
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.txtProfile}>Profile</Text>
      <Image source={images.userAvatar} style={styles.Avatar} />
      <Text style={styles.txtUserName}>{userData?.Name}</Text>
      <View style={{...styles.emailContainer, marginTop: hp(3)}}>
        <Text style={styles.txtEmailHeading}>Email:</Text>
        <Text style={styles.txtEmail}>{userData?.Email}</Text>
      </View>

      <View style={styles.line}></View>
      <View style={styles.emailContainer}>
        <Text style={styles.txtEmailHeading}>Mobile No:</Text>
        <Text style={styles.txtEmail}>{userData?.Phone}</Text>
      </View>
      <View style={styles.line}></View>
      {userData?.UserType === 'Student' ? (
        <>
          <View style={styles.emailContainer}>
            <Text style={styles.txtEmailHeading}>School Name:</Text>
            <Text style={styles.txtEmail}>{userData?.SchoolName}</Text>
          </View>
          <View style={styles.line}></View>

          <View style={styles.emailContainer}>
            <Text style={styles.txtEmailHeading}>Class Name:</Text>
            <Text style={styles.txtEmail}>{userData?.ClassName}</Text>
          </View>
          <View style={styles.line}></View>

          <View style={styles.emailContainer}>
            <Text style={styles.txtEmailHeading}>Teacher Name:</Text>
            <Text style={styles.txtEmail}>{userData?.TeacherName}</Text>
          </View>
          <View style={styles.line}></View>
        </>
      ) : null}

      <View style={styles.emailContainer}>
        <Text style={styles.txtEmailHeading}>City:</Text>
        <Text style={styles.txtEmail}>{coordinates?.city}</Text>
      </View>
      <View style={styles.line}></View>

      <View style={styles.emailContainer}>
        <Text style={styles.txtEmailHeading}>Country:</Text>
        <Text style={styles.txtEmail}>{coordinates?.country}</Text>
      </View>
      <View style={styles.line}></View>
      <Button
        title="Log Out"
        onPress={() => {
          dispatch(setToken(''));
          dispatch(api.util.resetApiState())
        }}
        container={styles.button}
      />
    </View>
  );
};
export default Profile;
