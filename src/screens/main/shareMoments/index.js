import React, {useContext, useEffect, useState} from 'react';
import {ImageBackground, Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {images} from '../../../assets/images';
import {hp, rhp, wp} from '../../../constants';
import {useDispatch, useSelector} from 'react-redux';
// import firestore from '@react-native-firebase/firestore';
// import {LoaderContext} from '@src/components/appLoading';
// import auth from '@react-native-firebase/auth';
import moment from 'moment';
import {
  useSetLoader,
} from '@src/hooks'

const ShareMoments = props => {
  const setLoader = useSetLoader();
  const [weekData, setWeekData] = useState([[], [], [], [], [], [], []]);
  const dispatch = useDispatch();

  // Get User Data
  useEffect(() => {
    getAllPost();
  }, []);

  const getAllPost = async () => {
    // setLoader(true);
    // const uid = auth().currentUser.uid;
    // await firestore()
    //   .collection('usersPost')
    //   .doc('allPost')
    //   .onSnapshot(
    //     snapshot => {
    //       const allPost = snapshot?.data()?.post;
    //       const filteredPost = allPost.filter(item => item.uid === uid);
    //       filterAndSeprate(filteredPost);
    //       setLoader(false);
    //     },
    //     error => {
    //       setLoader(false);
    //       console.log(error);
    //     },
    //   );
  };

  const filterAndSeprate = data => {
    // Create an array to store separate arrays for each day
    const separateDays = [];

    // Get the current date
    const currentDate = moment();

    // Calculate the start and end dates of the current week
    const startDate = currentDate.clone().startOf('isoWeek'); // Set to Monday of the current week
    const endDate = currentDate.clone().endOf('isoWeek'); // Set to Sunday of the current week

    // Iterate over each day of the week
    for (let day = 0; day < 7; day++) {
      // Calculate the date for the current day
      const currentDay = startDate.clone().add(day, 'days');

      // Filter the data for the current day
      const filteredData = data.filter(obj => {
        const objDate = moment(obj.date);
        return objDate.isSame(currentDay, 'day');
      });

      // Add the filtered data to the separateDays array
      separateDays.push(filteredData);
    }
    setLoader(false);
    setWeekData(separateDays);
    // console.log(separateDays);
  };

  const LevelContainer = props => {
    const {style, day, level, score} = props;
    return (
      <View style={{width: wp(25), position: 'absolute', ...style}}>
        <View
          style={{
            borderWidth: 2,
            borderColor: 'red',
            borderRadius: 10,
            paddingTop: hp(1),
            paddingBottom: hp(0.3),
            width: wp(25),
            backgroundColor: '#ffffff',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: rhp(16),
              color: '#000000',
              textDecorationLine: 'underline',
            }}>
            {`Level # ${level}`}
          </Text>
          <Text style={{fontSize: rhp(20), color: '#000000'}}>
            {`Score: ${score}`}
          </Text>
        </View>
        <Text
          style={{
            marginTop: hp(0.5),
            alignSelf: 'center',
            color: '#000000',
            fontSize: rhp(19),
          }}>
          {day}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <ImageBackground style={{flex: 1}} source={images.shareBackground}>
          {/* <TouchableOpacity
            onPress={ () => {
              dispatch(setIsLogin(false));
            } }>
            <Text style={ { fontSize: 15, color: '#000' } }>LogOut</Text>
          </TouchableOpacity> */}

          <LevelContainer
            style={{bottom: hp(2), right: wp(15)}}
            day={'Monday'}
            level={1}
            score={weekData[0]?.length}
          />
          <LevelContainer
            style={{bottom: hp(14), left: wp(2)}}
            day={'Tuesday'}
            level={2}
            score={weekData[1]?.length}
          />
          <LevelContainer
            style={{bottom: hp(25), right: wp(20)}}
            day={'Wednesday'}
            level={3}
            score={weekData[2]?.length}
          />
          <LevelContainer
            style={{bottom: hp(35), left: wp(2)}}
            day={'Thursday'}
            level={4}
            score={weekData[3]?.length}
          />
          <LevelContainer
            style={{bottom: hp(47), right: wp(10)}}
            day={'Friday'}
            level={5}
            score={weekData[4]?.length}
          />
          <LevelContainer
            style={{bottom: hp(52), left: wp(7)}}
            day={'Saturday'}
            level={6}
            score={weekData[5]?.length}
          />
          <LevelContainer
            style={{bottom: hp(63), left: wp(35)}}
            day={'Sunday'}
            level={7}
            score={weekData[6]?.length}
          />
        </ImageBackground>
      </View>
    </View>
  );
};
export default ShareMoments;
