import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from './styles';
import { images } from '../../../assets/images';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Composer,
  Send,
} from 'react-native-gifted-chat';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { IS_IPHONE_X, hp } from '../../../constants';

import { useSelector } from 'react-redux'
import { selectProfile } from '@src/redux/userSlice'

import api from '@src/data'

const Messeges = props => {
  const { userUid } = props?.route?.params;

  const profile = useSelector(selectProfile)

  const [tag, setTag] = useState('')
  const [messages, setMessages] = useState([]);

  const {navigation} = props
    React.useLayoutEffect(() => {
      navigation.setOptions({
        tabBarStyle: {
          display: "none",
        },
      });
    }, [navigation]);

  const getChatRes = api.useGetChatQuery({
    Tag: tag,
  })
  useEffect(()=>{
    if (profile.ID === '') return
    const myid = parseInt(profile.ID)
    if (myid < userUid) {
      setTag(`${myid}-${userUid}`)
    } else {
      setTag(`${userUid}-${myid}`)
    }
  }, [profile])
  useEffect(()=>{
    if (!getChatRes.data) return
    const msgs = getChatRes.data.map(d=>{
      return {
        _id: d.ID,
        text: d.Text,
        createdAt: d.CreatedAt,
        user: {
          _id: d.FromID,
          name: d.From.Name,
        },
      }
    })
    setMessages(msgs)
  }, [getChatRes.data])

  // useFocusEffect(() => {
  //   getAllMsg();
  // });

  const getAllMsg = async () => {
    // const uid = auth().currentUser.uid;
    // const docId = userUid > uid ? uid + '-' + userUid : userUid + '-' + uid;
    // const querySnap = await firestore()
    //   .collection('chatRoom')
    //   .doc(docId)
    //   .collection('messages')
    //   .orderBy('createdAt', 'desc')
    //   .get();
    //
    // const allMsg = querySnap.docs.map(doc => {
    //   return {
    //     ...doc.data(),
    //     createdAt: doc.data().createdAt.toDate(),
    //   };
    // });
    // setMessages(allMsg);
  };

  const [newChatMutation, newChatMutationRes] = api.useNewChatMutation()

  useEffect(()=> {
    console.log("newChatMutationRes: ", newChatMutationRes)
    if (!newChatMutationRes.data) return
  }, [newChatMutationRes.data])

  const onSend = async messagesArray => {

    // const uid = auth().currentUser.uid;
    const uid = profile.ID

    const msg = messagesArray[0];
    const myMsg = {
      ...msg,
      sentBy: uid,
      sentTo: userUid,
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));

    const docId = userUid > uid ? uid + '-' + userUid : userUid + '-' + uid;
    newChatMutation({
      Tag: docId,
      Text: msg.text,
    })

    // const docSnapshot = await firestore()
    //   .collection('chatRoom')
    //   .doc(docId)
    //   .get();
    // const existingMessages = docSnapshot.exists
    //   ? docSnapshot.data().messages
    //   : [];

    // // Combine the existing messages with the new message
    // const combinedMessages = [...existingMessages, myMsg];

    // Update the document with the combined messages
    // firestore()
    //   .collection('chatRoom')
    //   .doc(docId)
    //   .collection('messages')
    //   .add(myMsg);
  };

  const renderBubble = props => {
    return (
      <Bubble
        { ...props }
        wrapperStyle={ {
          left: {
            backgroundColor: '#f0f0f0',
          },
          right: {
            backgroundColor: '#FE4E8C',
          },
        } }
        textStyle={ {
          left: {
            color: '#000',
          },
          right: {
            color: '#fff',
          },
        } }
      />
    );
  };

  const renderSend = props => {
    return (
      <Send { ...props }>
        <Image source={ images.sendBtn } style={ styles.imgSendBtn } />
      </Send>
    );
  };

  // style={ { height: hp(), flex: 1, paddingBottom: IS_IPHONE_X ? hp(2.5) : hp(0) } }

  return (
    <SafeAreaView
      style={{ flex: 1, height: hp(100)}}
    >
      <View style={ styles.container }>
        <View style={ styles.header }>
          <View style={ styles.arrowView }>
            <TouchableOpacity onPress={ () => props.navigation.goBack() }>
              <Image source={ images.leftArrow } style={ styles.leftArrow } />
            </TouchableOpacity>
            <Text style={ styles.txtMessege }>Messeges</Text>
            <Text>{ '    ' }</Text>
          </View>
          <View style={ styles.blackLayer }>
            <Image source={ images.userProfile } style={ styles.imgUserIcon } />
            <TouchableOpacity>
              <Image source={ images.option } style={ styles.imgOption } />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1}}>
          <GiftedChat
            messages={ messages }
            alignTop={true}
            inverted={false}
            scrollToBottom={true}
            showUserAvatar={true}
            alwaysShowSend={ true }
            renderBubble={ renderBubble }
            renderAvatar={ null }
            textInputProps={ styles.input }
            renderSend={ renderSend }
            bottomOffset={ IS_IPHONE_X ? hp(10) : hp(8) }
            onSend={ text => onSend(text) }
            user={ {
              // _id: auth().currentUser.uid,
              _id: profile.ID,
            } }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Messeges;
