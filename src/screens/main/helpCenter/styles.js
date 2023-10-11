import { StyleSheet } from 'react-native';
import { hp, wp, rhp } from '../../../constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingBottom: hp(7.5)
    },
    header: {
        height: hp(7.5),
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
    emergencyTitle: {
        fontSize: rhp(32),
        color: "#003060",
        marginTop: hp(10),
        marginLeft: wp(5),
        // alignSelf: "center"
    },
    emergencyDescription: {
        color: "#003060",
        marginTop: hp(1.5),
        marginLeft: wp(5),
        fontSize: rhp(18),
    },
    sos: {
        height: hp(7),
        width: hp(7),
        resizeMode: "contain",
        tintColor: "white"
    },
    sosContainer: {
        height: hp(17),
        width: hp(17),
        borderRadius: hp(10),
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        // marginTop: hp(10),
        alignSelf: "center"
    },
    cancelButton: {
        height: hp(6),
        width: "60%",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#003060",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    cancelText: {
        color: "#003060",
        fontSize: rhp(18)
    }
});
export default styles;
