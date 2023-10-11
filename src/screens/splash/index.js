import React, {useEffect, useRef} from 'react';
import {View, Text, Image, Animated, Easing} from 'react-native';
import styles from './styles';
import {images} from '../../assets/images';
import {useDispatch, useSelector} from 'react-redux';
import {hp} from '../../constants';

import {
  selectIsLogin,
  // selectProfile,
} from '@src/redux/userSlice'

const Splash = props => {
  // const UserSlice = useSelector(selectProfile);
  const isLogin = useSelector(selectIsLogin);
  const dotSize = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    setTimeout(() => {
      props.navigation.replace(
        isLogin === true ? 'bottomStack' : 'Login',
      );
      // props.navigation.replace('Login');
    }, 2500);
  });
  const position = useRef(new Animated.ValueXY(0, 0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(position, {
          toValue: {x: -30, y: -30},
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(position, {
          toValue: {x: 30, y: 30},
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(position, {
          toValue: {x: 0, y: 0},
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

  const dotStyle = {
    transform: position.getTranslateTransform(),
    width: hp(4),
    height: hp(4),
    borderRadius: hp(2),
    backgroundColor: '#FF4475',
  };

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <View style={styles.textView}>
          <Text style={styles.text}>See your</Text>
          <Text style={styles.textHeart}>HEART BEAT</Text>
        </View>
        {/* <Image
      source={images.shape}
      style={styles.shapeImg}
      resizeMode="contain"
    /> */}
      </View>
      <View style={styles.dot}>
        <Animated.View style={[dotStyle]} />
      </View>
      <Image source={images.logo} style={styles.logo} resizeMode="contain" />
      {/* <Image
    source={images.shape1}
    style={styles.shape1Img}
    resizeMode="contain"
  /> */}
    </View>
  );
};
export default Splash;
