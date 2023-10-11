import {StyleSheet} from 'react-native';
import {hp, wp, rhp} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingVertical: hp(4),
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
  inputView: {
    marginTop: hp(2),
  },
});

export default styles;
