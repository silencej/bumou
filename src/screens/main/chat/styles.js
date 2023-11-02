import {StyleSheet} from 'react-native';
import {hp, wp, rhp} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    height: hp(12),
    backgroundColor: '#FE4E8C',
  },
  txtUser: {
    fontSize: rhp(23),
    color: '#fff',
    fontWeight: '600',
  },
  imgOption: {
    height: hp(5),
    width: wp(5),
    resizeMode: 'contain',
  },
  txtIconView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(3),
    marginTop: hp(2.5),
    alignItems: 'center',
  },
  txtChat: {
    fontSize: rhp(20),
    color: '#fff',
    fontWeight: '600',
    marginLeft: wp(2),
  },
  line: {
    height: hp(0.6),
    width: wp(15),
    backgroundColor: '#fff',
  },
  chatLineView: {
    marginLeft: wp(8),
    justifyContent: 'center',
    marginTop: hp(0.7),
  },
  divider: {
    height: hp(0.1),
    backgroundColor: '#D9D9D9',
    marginTop: hp(3),
  },
  divider1: {
    height: hp(0.1),
    backgroundColor: '#D9D9D9',
    marginTop: hp(1),
  },
  imgUserIcon: {
    height: hp(6),
    width: wp(12),
    resizeMode: 'contain',
  },
  txtRandom: {
    fontSize: rhp(18),
    color: '#fff',
    fontWeight: '400',
  },
  txtRandom: {
    fontSize: rhp(18),
    color: '#fff',
    fontWeight: '400',
  },
  txtMessege: {
    fontSize: rhp(15),
    color: '#fff',
    fontWeight: '400',
  },
  nameOrTime: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  userView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(3),
    marginTop: hp(1),
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000070',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: hp(3),
    paddingHorizontal: wp(5),
    width: '80%',
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    width: '20%',
    backgroundColor: '#FE4E8C',
  },
  buttonClose: {
    backgroundColor: '#FE4E8C',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  iconImg: {
    height: hp(3.5),
    width: wp(3.5),
    resizeMode: 'contain',
  },
  homeIcon: {
    height: hp(4),
    width: wp(4),
    resizeMode: 'contain',
  },
  catagoryTxt: {
    fontSize: rhp(15),
    color: '#000000',
  },
  catagoryView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: hp(1),
  },
});
export default styles;
