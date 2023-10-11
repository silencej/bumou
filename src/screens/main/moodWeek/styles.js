import { StyleSheet } from 'react-native';
import { hp, wp, rhp, IS_IPHONE_X } from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(3),
    marginHorizontal: wp(3),
  },
  leftArrow: {
    height: hp(4),
    width: wp(8),
    resizeMode: 'contain',
  },
  headingTxt: {
    fontSize: rhp(25),
    color: '#000000',
    fontWeight: '600',
  },
  txtMoodweek: {
    color: '#FE4E8C',
  },
  boxView: {
    height: hp(20),
    width: wp(26),
    borderColor: '#FE4E8C',
    borderWidth: 3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: hp(1),
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    marginTop: hp(3),
  },
  boxTxt: {
    fontSize: rhp(17),
    color: '#000',
    fontWeight: '600',
  },
  emoji1: {
    height: hp(4),
    width: hp(4),
    resizeMode: 'contain',
  },
  emojiView: {
    paddingLeft: wp(2),
  },
  topButton: {
    width: '30%',
    height: hp(5),
    borderRadius: 5,
    backgroundColor: '#CB0061',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
    marginBottom: hp(5),
  },
  emojiTxt: {
    color: '#000000',
    fontSize: rhp(14),
  },
  emojiCatagory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(12),
    marginLeft: wp(5),
    marginBottom: IS_IPHONE_X ? hp(5) : hp(7),
  },
});
export default styles;
