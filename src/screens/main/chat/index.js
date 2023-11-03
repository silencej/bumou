import React, {useCallback, useRedux, useContext, useState, useEffect, } from 'react'
import {
  useSelector,
} from 'react-redux'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import styles from './styles';
import {images} from '../../../assets/images';

import {useFocusEffect} from '@react-navigation/native';
import {KeyboardAvoidingScrollView} from '../../../components/keyboardAvoidingScrollView';

import {
  selectProfile,
} from '@src/redux/userSlice'
import {useSetLoader}from '@src/hooks'

import api from '@src/data'

import {
	ScreenCapturePickerView,
	RTCPeerConnection,
	RTCIceCandidate,
	RTCSessionDescription,
	RTCView,
	MediaStream,
	MediaStreamTrack,
	mediaDevices,
	registerGlobals,
} from 'react-native-webrtc'
import { useImmer } from "use-immer"

const PC = {
	iceServers: [
		{
			urls: 'stun:stun.l.google.com:19302'
		},
    {
      urls: "turn:bumou.space:3478",
      username: "bumou",
      credential: "3vlSSrbJNQg",
    },
	]
}

const sessionConstraints = {
	mandatory: {
		OfferToReceiveAudio: true,
		OfferToReceiveVideo: true,
		VoiceActivityDetection: true
	}
};

function RTC({
  user,
  status,
  isVoiceOnly = false,
}) {
  const [mc, setMc] = useImmer({
	  audio: true,
	  video: {
		  frameRate: 30,
		  facingMode: 'user'
	  }
  })
  function toggleAudio() {
    setMc(draft => draft.audio=!draft.audio)
  }

  const [ms, setMs] = useState(null)
  const [pc, setPc] = useState(null)
  const [sc, setSc] = useState(null)

  useEffect(()=>{
    (async(){

      if (status === "off") {
        if (!!ms) ms.getTracks().forEach(t=>t.stop())
        setMs(null)
        if (!!pc) pc.close()
        setPc(null)
        return
      }

      try {
	      const ms = await mediaDevices.getUserMedia( mc );
	      if ( isVoiceOnly ) {
		      let videoTrack = await mediaStream.getVideoTracks()[ 0 ];
		      videoTrack.enabled = false;
	      };
        setMs(ms)
      } catch( err ) {
	      // Handle Error
        alert(err)
      };

      const pc = new RTCPeerConnection(PC)
      setPc(pc)

      ms.getTracks().forEach(
	      track => pc.addTrack( track, ms );
      );


      const offerDescription = await pc.createOffer( sessionConstraints );
	    await pc.setLocalDescription( offerDescription );
    })()
  }, [mc, status])

  useEffect(()=>{
    (async(){
      const devices = await mediaDevices.enumerateDevices();
      console.log("Devices: ", devices)
    })()
  }, [])
  return <></>
}

function ChatBox({
  userData,
  modalVisible,
  setModalVisible,
  navigation,
  setRtcUser,
}) {

  const coord = userData?.Coordinates ? JSON.parse(userData?.Coordinates) : {}

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.catagoryView}>
            <Image style={styles.iconImg} source={images.userIcon} />
            <Text style={styles.catagoryTxt}>
              {'   '}
              {userData?.Name}
            </Text>
          </View>
          <View style={styles.catagoryView}>
            <Image style={styles.iconImg} source={images.emailIcon} />
            <Text style={styles.catagoryTxt}>
              {'   '}
              {userData?.Email}
            </Text>
          </View>
          <View style={styles.catagoryView}>
            <Image style={styles.homeIcon} source={images.homeIcon} />
            <Text style={styles.catagoryTxt}>
              {'   '}
              {coord?.city}
            </Text>
          </View>
          <View style={styles.catagoryView}>
            <Image style={styles.iconImg} source={images.locationIcon} />
            <Text style={styles.catagoryTxt}>
              {'   '}
              {coord?.country}
            </Text>
          </View>
          {userData?.UserType === 'Student' ? (
            <>
              <View style={styles.catagoryView}>
                <Text style={{...styles.catagoryTxt, fontWeight: 'bold'}}>
                  School Name:
                </Text>
                <Text style={styles.catagoryTxt}>
                  {'   '}
                  {userData?.SchoolName}
                </Text>
              </View>
              <View style={styles.catagoryView}>
                <Text style={{...styles.catagoryTxt, fontWeight: 'bold'}}>
                  Class Name:
                </Text>
                <Text style={styles.catagoryTxt}>
                  {'   '}
                  {userData?.ClassName}
                </Text>
              </View>
              <View style={styles.catagoryView}>
                <Text style={{...styles.catagoryTxt, fontWeight: 'bold'}}>
                  Teacher Name:
                </Text>
                <Text style={styles.catagoryTxt}>
                  {'   '}
                  {userData?.TeacherName}
                </Text>
              </View>
            </>
          ) : (
            <View style={styles.catagoryView}>
              <Text style={{...styles.catagoryTxt, fontWeight: 'bold'}}>
                Mobile No:
              </Text>
              <Text style={styles.catagoryTxt}>
                {'   '}
                {userData?.Phone}
              </Text>
            </View>
          )}

          <View style={styles.btnView}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Messeges', {
                  userUid: userData?.ID,
                });
              }}>
              <Text style={styles.textStyle}>Text</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Messeges', {
                  userUid: userData?.ID,
                });
              }}>
              <Text style={styles.textStyle}>Audio</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalVisible(false);
                setRtcUser(userData?.ID)
              }}>
              <Text style={styles.textStyle}>Video</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>

  )
}

export default function Chat (props) {
  const setLoader = useSetLoader();
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState('');

  const [talkTo, setTalkTo] = useState(-1)

  const profile = useSelector(selectProfile)

  const getUsersRes = api.useGetUsersQuery()
  useEffect(()=>{
    if (!!getUsersRes.data) {
      console.log(`getUsersRes.data: `, getUsersRes.data)
      console.log(`profile: `, profile)
      // setUsers(getUsersRes.data)
      setUsers(getUsersRes.data.filter(u=> u.Type === profile.Type && u.ID!=profile.ID))
    }
  }, [getUsersRes.data])

  const [rtcUser, setRtcUser] = useState(null)

  const getUserType = () => {
    // setLoader(true);
    // const uid = auth().currentUser.uid;
    // const uid = 0
    // firestore()
    //   .collection('users')
    //   .doc(uid)
    //   .get()
    //   .then(querySnapshot => {
    //     getAllUsers(querySnapshot._data.userType);
    //     setLoader(false);
    //   })
    //   .catch(error => {
    //     setLoader(false);
    //     console.log(error.message);
    //   });
  };

  const getAllUsers = userType => {
    // const currentUser = auth().currentUser.uid;
    // firestore()
    //   .collection('users')
    //   .where('userType', '==', userType)
    //   .get()
    //   .then(querySnapshot => {
    //     const usersData = querySnapshot.docs;
    //     let filteredUsers = usersData.map(item => item._data);
    //     const filter = filteredUsers.filter(item => item.uid !== currentUser);
    //     setUsers(filter);
    //   })
    //   .catch(error => {
    //     console.log(error.message);
    //   });
  };

  const checkUserChatExist = async item => {
    // setLoader(true);
    setUserData(item);
    // const uid = auth().currentUser.uid;
    // const docId = item.uid > uid ? uid + '-' + item.uid : item.uid + '-' + uid;
    // const data = await firestore()
    //   .collection('chatRoom')
    //   .doc(docId)
    //   .collection('messages')
    //   .get();
    // if (data.empty) {
    //   setLoader(false);
    //
    //   setModalVisible(true);
    //   // alert('Not found');
    // } else {
    //   setLoader(false);
    //
    //   props.navigation.navigate('Messeges', {
    //     userUid: item.uid,
    //   });
    // }
  };

  // console.log('===>>>', userData.Coordinates);

  const renderItem = ({item, index}) => {
    return (
      <>
        <View style={styles.divider}></View>
        <TouchableOpacity onPress={() => {
          // checkUserChatExist(item)
          // setTag([item.ID, profile.ID].sort().join("-"))
          setTalkTo(index)
          setModalVisible(true)
        }}>
          <View style={styles.userView}>
            <View style={styles.nameOrTime}>
              <Image source={images.userProfile} style={styles.imgUserIcon} />
              <View style={{marginLeft: 20}}>
                <Text style={styles.txtRandom}>{item?.Name}</Text>
                <Text style={styles.txtMessege}>messeges</Text>
              </View>
            </View>
            {/* <Text style={styles.txtRandom}>11:30am</Text> */}
          </View>
        </TouchableOpacity>

        <View style={styles.divider1}></View>
      </>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.txtIconView}>
          <Text style={styles.txtUser}>User Chatlog</Text>
          <TouchableOpacity>
            <Image source={images.option} style={styles.imgOption} />
          </TouchableOpacity>
        </View>
        <View style={styles.chatLineView}>
          <Text style={styles.txtChat}>Chat</Text>
          <View style={styles.line}></View>
        </View>
      </View>

      <View>
        <FlatList
          data={users}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <RTC
        user={rtcUser}
        status={rtcUser!=null}
      />

      <ChatBox
        {...{
          userData: users[talkTo],
          modalVisible,
          setModalVisible,
          navigation: props.navigation,
          setRtcUser,
        }}
      />
    </View>
  );
};
