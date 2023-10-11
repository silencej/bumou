import { StyleSheet } from 'react-native';
import { hp, wp, rhp } from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: hp(3),
  },
  bgImg: {
    height: hp(100),
    width: wp(100),
    alignItems: 'center',
  },
  inputContainer: {
    paddingBottom: hp(4),
    width: wp(95),
    alignSelf: 'center',
    backgroundColor: '#8E8E8E90',
    borderRadius: 13,
    borderColor: '#F1F1F170',
    borderWidth: 3,
    marginTop: hp(13),
    alignItems: 'center',
    shadowColor: '#00000025',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  logoImg: {
    height: hp(15),
    width: wp(30),
    marginTop: hp(-9),
  },
  lockIconImg: {
    height: hp(9),
    width: wp(14),
    marginLeft: wp(28),
    marginTop: hp(-5),
  },
  txtLogin: {
    color: '#000',
    fontSize: rhp(30),
    fontWeight: 'bold',
  },
  pickerView: {
    marginHorizontal: wp(1.5),
    marginTop: hp(4),
    marginBottom: hp(1),
    zIndex: 9999
  },
  arrowImg: {
    height: hp(1),
    width: wp(6),
  },
  txtCategory: {
    color: '#787575',
    fontSize: rhp(15),
  },
  dot: {
    position: 'absolute',
    bottom: hp(6),
    right: wp(1),
    zIndex: 9999,
  },
  emailTxtView: {
    height: hp(3),
    width: wp(42),
    marginHorizontal: wp(2),
    justifyContent: 'center',
  },
  emailTxt: {
    color: '#000000',
    fontSize: rhp(15),
  },
});

export default styles;
