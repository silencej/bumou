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
  likeButton: {
    height: hp(2.3),
    width: hp(2.3),
    resizeMode: 'contain',
  },
  commentButton: {
    height: hp(2.5),
    width: hp(2.5),
    resizeMode: 'contain',
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(1),
    marginHorizontal: wp(3),
  },
  flatlistContainer: {
    flex: 1,
    marginBottom: hp(10),
    marginTop: hp(2),
  },
  card: {
    width: wp(90),
    paddingVertical: wp(2),
    paddingHorizontal: hp(2),
    backgroundColor: '#fff',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: hp(1),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
  },
  nameAndDateContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
  emojiName: {
    fontSize: rhp(16),
    color: 'black',
    fontWeight: '500',
    marginLeft: wp(3),
  },
  emojiDate: {
    fontSize: rhp(12),
    color: '#00000070',
    fontWeight: '500',
  },
  descriptionText: {
    // marginTop: hp(1),
    fontSize: rhp(14),
    color: 'black',
    fontWeight: '400',
    textAlign: 'justify',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
    justifyContent: 'space-between',
  },
  buttonLikeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(40),
    borderColor: '#000000',
    borderWidth: 0.5,
    justifyContent: 'space-between',
    borderRadius: 20,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.6),
  },
  buttonCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(40),
    borderColor: '#000000',
    borderWidth: 0.5,
    borderRadius: 20,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.6),
  },
  likeText: {
    fontSize: rhp(12),
    color: 'black',
    marginLeft: wp(2),
  },
  commentText: {
    fontSize: rhp(12),
    color: 'black',
    marginLeft: wp(2),
  },
  userAvatar: {
    height: hp(5),
    width: hp(5),
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000030',
    borderRadius: 40,
  },
  userChar: {
    fontSize: rhp(25),
    color: '#000',
    fontWeight: 'bold',
  },
  descriptionView: {
    width: wp(69),
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  emojiImg: {
    height: hp(3),
    width: hp(3),
    resizeMode: 'contain',
  },
  input: {
    // width: wp(82),
    height: hp(5.5),
    flex: 1,
    color: '#000',
    paddingHorizontal: wp(3),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 18,
    marginTop: hp(1),
    marginHorizontal: wp(5),
  },
  inputImg: {
    height: hp(3),
    width: hp(3),
    resizeMode: 'contain',
    marginRight: wp(1.5),
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00000050',
  },
  modalView: {
    backgroundColor: '#fff',
    paddingBottom: hp(1),
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: hp(3),
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    width: '40%',
    backgroundColor: '#FE4E8C',
  },
  textStyle: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  devider: {
    height: hp(0.2),
    width: wp(100),
    backgroundColor: '#FE4E8C',
  },
  userIcon: {
    height: hp(6),
    width: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000060',
    borderRadius: 40,
  },
  commentView: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    width: wp(70),
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#00000060',
    borderRadius: 10,
    marginLeft: wp(2),
  },
  closeImg: {
    height: hp(4),
    width: hp(4),
    resizeMode: 'contain',
  },
  closeBtn: {
    alignSelf: 'flex-end',
    paddingRight: 10,
    paddingTop: 15,
  },
});
export default styles;
