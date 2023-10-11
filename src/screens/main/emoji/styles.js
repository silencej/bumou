import {StyleSheet} from 'react-native';
import {hp, wp, rhp} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headingTxt: {
    fontSize: rhp(25),
    color: '#000000',
    fontWeight: '600',
  },
  leftArrow: {
    height: hp(4),
    width: wp(8),
    resizeMode: 'contain',
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(3),
    marginHorizontal: wp(3),
  },
  emojiImg: {
    height: hp(8),
    width: wp(16),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  txtVgood: {
    fontSize: rhp(20),
    color: '#000000',
    fontWeight: '600',
    marginTop: hp(2),
  },
  emojiTopView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(10),
    marginTop: hp(6),
  },
  goodEmojiView: {
    alignItems: 'center',
  },
  neutralView: {
    alignItems: 'center',
    marginTop: hp(4),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000070',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    borderRadius: 20,
    backgroundColor: '#ffffff',
    paddingVertical: hp(3),
    paddingHorizontal: wp(5),
    width: '80%',
  },
  motivationalText: {
    marginTop: hp(2),
    fontSize: hp(3),
    fontWeight: '500',
    textAlign: 'center',
    color: '#000000',
  },
  button: {
    width: '48%',
    backgroundColor: '#FE4E8C',
  },
  input: {
    width: wp(70),
  },
});
export default styles;
