import {StyleSheet} from 'react-native';
import {hp, wp, rhp} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  txtProfile: {
    fontSize: rhp(25),
    color: '#000',
    fontWeight: '600',
    alignSelf: 'center',
    marginVertical: hp(3),
  },
  Avatar: {
    height: hp(10),
    width: hp(10),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  txtUserName: {
    fontSize: rhp(20),
    color: '#000',
    fontWeight: '600',
    alignSelf: 'center',
  },
  txtEmailHeading: {
    fontSize: rhp(18),
    color: '#000',
    fontWeight: '700',
  },
  txtEmail: {
    fontSize: rhp(18),
    color: '#000',
    fontWeight: '400',
  },
  emailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(10),
    marginVertical: hp(2),
  },
  line: {
    width: wp(90),
    height: 1,
    backgroundColor: '#FF4475',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#FF4475',
    alignSelf: 'center',
  },
});
export default styles;
