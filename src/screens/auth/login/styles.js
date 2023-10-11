import { StyleSheet } from 'react-native';
import { hp, wp, rhp } from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp(100),
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: hp(3),
  },
  bgImg: {
    height: hp(100),
    width: wp(100),
    alignItems: 'center',
  },
  inputContainer: {
    paddingVertical: hp(5),
    width: wp(95),
    alignSelf: 'center',
    backgroundColor: '#8E8E8E90',
    borderRadius: 13,
    borderColor: '#F1F1F170',
    borderWidth: 3,
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
    marginTop: hp(-14),
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
  txtDont: {
    color: '#000',
    fontSize: rhp(18),
    fontWeight: '600',
  },
  txtSignUp: {
    color: '#FE4E8C',
    fontSize: rhp(18),
    fontWeight: '600',
  },
  txtBEURL: {
    color: '#eee',
    fontSize: rhp(12),
    // fontWeight: '600',
  },
  bottomTxtView: {
    flexDirection: 'row',
    marginTop: hp(2),
    right: 0,
  },
  customInputStyle: {
    width: '100%',
    height: hp(7),
    // backgroundColor: Theme.black,
    // borderColor: '#fff',
    // borderWidth: 1,
  },
  inputView: {
    marginHorizontal: wp(2),
    borderRadius: 10,
  },
  textInputStyle: {
    padding: 0,
    color: '#000',
    borderRadius: 5,
    height: hp(5),
    alignItems: 'center',
  },
  dot: {
    position: 'absolute',
    bottom: hp(6),
    right: wp(1),
    zIndex: 9999
  }
});

export default styles;
