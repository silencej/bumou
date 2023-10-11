import { StyleSheet } from 'react-native';
import { hp, wp, rfs } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  shapeImg: {
    height: hp(15),
    width: wp(40),
  },
  text: {
    fontSize: rfs(22),
    color: '#000000',
  },
  textHeart: {
    fontSize: rfs(22),
    color: '#FF4475',
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    height: hp(25),
    width: wp(45),
    alignSelf: 'center',
    marginTop: hp(25),
  },
  textView: {
    marginTop: hp(6),
    marginLeft: wp(5),
  },
  shape1Img: {
    height: hp(18),
    width: wp(41),
    position: 'absolute',
    bottom: 0,
    left: -20,
  },
  dot: {
    position: 'absolute',
    top: hp(36),
    right: wp(22)

  }
});

export default styles;
