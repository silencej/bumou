import React, { useContext, useEffect, useState, useMemo, } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import moment from 'moment';

import styles from './styles';
import { images } from '../../../assets/images';
import { BarChart } from 'react-native-gifted-charts';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import { LoaderContext } from '../../../components/appLoading';
import { height, hp, width, wp } from '../../../constants';

// import { useFetch } from '@src/hooks'
import api from '@src/data'

import { useSetLoader } from '@src/hooks'

const MoodWeek = props => {
  const setLoader = useSetLoader()
  const [percentageVB, setPercentageVB] = useState(0);
  const [percentageB, setPercentageB] = useState(0);
  const [percentageN, setPercentageN] = useState(0);
  const [percentageG, setPercentageG] = useState(0);
  const [percentageVG, setPercentageVG] = useState(0);
  const [type, setType] = useState(1);
  const [moodData, setMoodData] = useState([]);

  const getPostsQueryRes = api.useGetMyPostsQuery()
  // console.log('getPostsQueryRes: ', getPostsQueryRes)

  // const fetch = useFetch()

  useEffect(() => {
    // (async function() {
    //   await getUserPost();
    // })()
    if (!!getPostsQueryRes.data) {
      setMoodData(getPostsQueryRes.data)
    }
  }, [getPostsQueryRes.data]); // TODO: fetch only once after add cache invalidation.

  const getUserPost = async () => {
    const data = await fetch(`/posts`)
    setMoodData(data)

    // setLoader(true);

    // const uid = auth().currentUser.uid;
    //firestore()
    //  .collection('usersPost')
    //  .doc('allPost')
    //  .onSnapshot(
    //    documentSnapshot => {
    //      if(documentSnapshot.exists) {
    //        const allPost = documentSnapshot?.data()?.post;
    //        const filteredPost = allPost?.filter(post => post?.uid === uid);
    //        setMoodData(filteredPost);
    //        getDataFromType(filteredPost);
    //        // filterAndSeprate(filteredPost);
    //        // console.log(filteredPost);
    //        setLoader(false);
    //      } else {
    //        console.log('Document "allPost" does not exist.');
    //        setLoader(false);
    //      }
    //    },
    //    error => {
    //      console.log(error);
    //      setLoader(false);
    //    },
    //  );
  };

  const getDataFromType = moodData => {
    const currentDate = moment(); // Get the current date
    let data = moodData;
    if(type == 1) {
      // Filter data for the current week
      data = data?.filter(item =>
        moment(item.Date).isSame(currentDate, 'week'),
      );
    } else if(type == 2) {
      // Filter data for the current month
      data = data?.filter(item =>
        moment(item.Date).isSame(currentDate, 'month'),
      );
    } else {
      data = data?.filter(item =>
        moment(item.Date).isSame(currentDate, 'year'),
      );
    }
    filterAndSeprate(data);
  };
  useEffect(() => {
    if(moodData?.length > 0) {
      getDataFromType(moodData);
    }
  }, [type, moodData]);
  // Filter and Seprate array

  const filterAndSeprate = dataArray => {
    const separateArrays = [];
    let veryBadArr = [];
    let badArr = [];
    let neutralArr = [];
    let goodArr = [];
    let veryGoodArr = [];
    dataArray.forEach(item => {
      const matchingArray = separateArrays?.find(arr =>
        arr.some(obj => obj?.date === item?.Date && obj?.Mood === item?.Mood),
      );
      if(matchingArray) {
        matchingArray.push(item);
      } else {
        separateArrays.push([item]);
      }
    });
    separateArrays.forEach((item, index) => {
      if(item[0]?.Mood === 'Very Bad') {
        veryBadArr = [...veryBadArr, ...item];
      } else if(item[0]?.Mood === 'Bad') {
        badArr = [...badArr, ...item];
      } else if(item[0]?.Mood === 'Neutral') {
        neutralArr = [...neutralArr, ...item];
      } else if(item[0]?.Mood === 'Good') {
        goodArr = [...goodArr, ...item];
      } else if(item[0]?.Mood === 'Very Good') {
        veryGoodArr = [...veryGoodArr, ...item];
      }
    });
    const fullLength = dataArray.length;

    const lengthVeryBad = veryBadArr.length;

    const lengthBad = badArr.length;

    const lengthNeutral = neutralArr.length;

    const lengthGood = goodArr.length;

    const lengthVeryGood = veryGoodArr.length;

    const percentageVB = roundNumber(
      calculatePercentage(lengthVeryBad, fullLength),
    );

    const percentageB = roundNumber(calculatePercentage(lengthBad, fullLength));

    const percentageN = roundNumber(
      calculatePercentage(lengthNeutral, fullLength),
    );

    const percentageG = roundNumber(
      calculatePercentage(lengthGood, fullLength),
    );

    const percentageVG = roundNumber(
      calculatePercentage(lengthVeryGood, fullLength),
    );

    setPercentageVB(percentageVB);
    setPercentageB(percentageB);
    setPercentageN(percentageN);
    setPercentageG(percentageG);
    setPercentageVG(percentageVG);
    setLoader(false);
  };

  const roundNumber = number => {
    if(Number.isInteger(number)) {
      return number.toString();
    } else {
      return number.toFixed(2);
    }
  };

  const calculatePercentage = (value, total) => {
    if(value == 0) return 0;
    let division = value / total;
    let percentage = division * 100;
    return percentage;
  };

  const barData = useMemo(()=>([
    {
      value: percentageVB,
      frontColor: '#A47551',
      topLabelComponent: () => (
        <Text
          style={ {
            color: '#000000',
            fontSize: 12,
            marginBottom: 6,
          } }>{ `${percentageVB} %` }</Text>
      ),
      labelComponent: () => CustomLabel(images.veryBad),
    },
    {
      value: percentageB,
      frontColor: '#A47551',
      topLabelComponent: () => (
        <Text
          style={ {
            color: '#000000',
            fontSize: 12,
            marginBottom: 6,
          } }>{ `${percentageB} %` }</Text>
      ),
      labelComponent: () => CustomLabel(images.bad),
    },
    {
      value: percentageN,
      frontColor: '#A47551',
      topLabelComponent: () => (
        <Text
          style={ {
            color: '#000000',
            fontSize: 12,
            marginBottom: 6,
          } }>{ `${percentageN} %` }</Text>
      ),
      labelComponent: () => CustomLabel(images.neutral),
    },
    {
      value: percentageG,
      frontColor: '#A47551',
      topLabelComponent: () => (
        <Text
          style={ {
            color: '#000000',
            fontSize: 12,
            marginBottom: 6,
          } }>{ `${percentageG} %` }</Text>
      ),
      labelComponent: () => CustomLabel(images.good),
    },
    {
      value: percentageVG,
      frontColor: '#A47551',
      topLabelComponent: () => (
        <Text
          style={ {
            color: '#000000',
            fontSize: 12,
            marginBottom: 6,
          } }>{ `${percentageVG} %` }</Text>
      ),
      labelComponent: () => CustomLabel(images.vGood),
    },
  ]), [percentageVB, percentageB, percentageN, percentageG, percentageVG]);

  const CustomLabel = img => {
    return (
      <View style={ styles.emojiView }>
        <Image source={ img } style={ styles.emoji1 } />
      </View>
    );
  };

  return (
    <View style={ styles.container }>
      <View style={ styles.headerView }>
        {/* <TouchableOpacity>
          <Image source={ images.leftArrow } style={ styles.leftArrow } />
        </TouchableOpacity> */}
        <View />

        <Text style={ styles.headingTxt }>
          Your <Text style={ styles.txtMoodweek }>Moodweek</Text>
        </Text>
        <View />
      </View>

      <View
        style={ {
          // justifyContent: 'center',
          paddingTop: hp(5),
          flex: 1,
        } }>
        <View style={ styles.topTab }>
          <TouchableOpacity
            onPress={ () => setType(1) }
            style={ [
              styles.topButton,
              type != 1 && { backgroundColor: 'transparent' },
            ] }>
            <Text
              style={ { fontSize: 16, color: type == 1 ? '#ffffff' : '#000000' } }>
              Weekly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={ () => setType(2) }
            style={ [
              styles.topButton,
              type != 2 && { backgroundColor: 'transparent' },
            ] }>
            <Text
              style={ { fontSize: 16, color: type == 2 ? '#ffffff' : '#000000' } }>
              Monthly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={ () => setType(3) }
            style={ [
              styles.topButton,
              type != 3 && { backgroundColor: 'transparent' },
            ] }>
            <Text style={ { fontSize: 16, color: type == 3 ? '#fff' : '#000' } }>
              Yearly
            </Text>
          </TouchableOpacity>
        </View>
        <View style={ styles.emojiCatagory }>
          <View style={ { alignItems: 'center' } }>
            <Image style={ styles.emoji1 } source={ images.veryBad } />
            <Text style={ styles.emojiTxt }>Verybad</Text>
          </View>
          <View style={ { alignItems: 'center' } }>
            <Image style={ styles.emoji1 } source={ images.bad } />
            <Text style={ styles.emojiTxt }>Bad</Text>
          </View>
          <View style={ { alignItems: 'center' } }>
            <Image style={ styles.emoji1 } source={ images.neutral } />
            <Text style={ styles.emojiTxt }>Neutral</Text>
          </View>
          <View style={ { alignItems: 'center' } }>
            <Image style={ styles.emoji1 } source={ images.good } />
            <Text style={ styles.emojiTxt }>Good</Text>
          </View>
          <View style={ { alignItems: 'center' } }>
            <Image style={ styles.emoji1 } source={ images.vGood } />
            <Text style={ styles.emojiTxt }>Verygood</Text>
          </View>
        </View>
        <BarChart
          showYAxisIndices
          barWidth={ wp(10) }
          noOfSections={ 5 }
          barBorderRadius={ 4 }
          data={ barData }
          yAxisThickness={ 0 }
          xAxisThickness={ 0 }
          dashGap={ 0 }
          height={ height / 3 }
          width={ width / 1.2 }
          gradientColor={ '#FFEEFE' }
          showGradient
          maxValue={ 100 }
          yAxisTextStyle={ { color: '#000000' } }
        />
      </View>
    </View>
  );
};
export default MoodWeek;
