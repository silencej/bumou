import { StyleSheet } from 'react-native';
import { hp, wp, rhp } from '../../../constants';

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    flex: 1,
    backgroundColor: '#000000',
    paddingBottom: hp(7.5),
  },
  header: {
    height: hp(12),
    backgroundColor: '#FE4E8C',
  },
  leftArrow: {
    height: hp(4),
    width: wp(8),
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  txtMessege: {
    fontSize: rhp(23),
    color: '#fff',
    fontWeight: '600',
  },
  arrowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
    paddingHorizontal: wp(3),
  },
  blackLayer: {
    height: hp(6),
    backgroundColor: '#00000060',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(3),
  },
  imgUserIcon: {
    height: hp(4.5),
    width: hp(4.5),
    resizeMode: 'contain',
  },
  imgOption: {
    height: hp(5),
    width: wp(5),
    resizeMode: 'contain',
  },
  imgKeyboard: {
    height: hp(3),
    width: hp(3),
    resizeMode: 'contain',
    marginLeft: wp(2),
  },
  imgSendBtn: {
    height: hp(3),
    width: hp(3),
    resizeMode: 'contain',
    bottom: hp(1.1),
    marginRight: wp(2),
  },
  input: {
    color: '#000000',
  },
});
export default styles;
