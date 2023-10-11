import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import styles from './styles';
import { images } from '../../../assets/images';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { LoaderContext } from '../../../components/appLoading';
import Button from '../../../components/button';
import Textinput from '../../../components/input';
import moment from 'moment';

import {
  selectProfile
} from '@src/redux/userSlice'

import {
  useFetch,
  useSetLoader,
} from '@src/hooks'

import api from '@src/data'

export default function Emoji(props) {
  // const { UserSlice } = useSelector(state => state);
  const UserSlice = useSelector(selectProfile)
  const setLoader = useSetLoader()
  const [userArray, setUserArray] = useState([]);
  const [emojiName, setEmojiName] = useState('');
  const [moodImage, setMoodImage] = useState(null);
  const [moodText, setMoodText] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [note, setNote] = useState('');

  // const [userName, setUserName] = useState('');
  // const userName = useSelector(selectProfile, state=>state.Name)

  const [randomId, setRandomId] = useState('');
  const dispatch = useDispatch();

  // console.log('api: ', api)
  const [createPostMutation, createPostMutationRes] = api.useCreatePostMutation()
  useEffect(()=>{
    console.log("createPostMutationRes.data: ", createPostMutationRes.data)
    if (!!createPostMutationRes.data) {
      alert('Post has been successfully created');
      setMoodImage(null);
      setMoodText(null);
      setEmojiName('');
    }
  }, [createPostMutationRes.data])

  const fetch = useFetch()

  const generateRandomId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 5);
    setRandomId(timestamp + random);
  };

  const postUpload = async () => {
    if(note === '') {
      alert('Please enter something');
      return
    }
    setModalOpen(false);

    try {
      // setLoader(true);
      const currentDate = new Date();
      // const formattedDate = moment(currentDate).format('MMMM Do YYYY / h:mm a');

      // const postDoc = await fetch()
      // const postDoc = await firestore()
      //   .collection('usersPost')
      //   .doc('allPost')
      //   .get();

      // const postDoc = null
      // let postArr = [];
      // if(postDoc) {
      //   const existingData = postDoc.data();
      //   postArr = existingData.post || [];
      // }

      const newPost = {
        Date: currentDate,
        Mood: emojiName,
        Desc: note,
        // UserID: ,
        // likes: [],
        // comments: [],
        // postId: randomId,
        // uid: userName?.uid,
        // formattedDate: formattedDate,
      };

      console.log(`newPost: `, newPost)
      createPostMutation(newPost)
      // const res = await fetch(`/posts`, {
      //   method: `POST`,
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(newPost)
      // })
      // console.log(res)

      // postArr.push(newPost);

      // await firestore()
      //   .collection('usersPost')
      //   .doc('allPost')
      //   .set({ post: postArr });

      // setLoader(false);

      // props.navigation.navigate('EmojiDetail', {
      //   currentUser: userName,
      //   focus: true,
      // });
    } catch(error) {
      setLoader(false);
      console.error(error);
    }
  };

  return (
    <View style={ styles.container }>
      <View style={ styles.headerView }>
        {/* <TouchableOpacity>
            <Image source={images.leftArrow} style={styles.leftArrow} />
            </TouchableOpacity> */}
        <View />
        <Text style={ styles.headingTxt }>How do you feel?</Text>
        <View />
      </View>

      <View style={ styles.emojiTopView }>
        <View style={ styles.goodEmojiView }>
          <TouchableOpacity
            onPress={ () => {
              setMoodImage(images.vGood);
              setMoodText(
                'This is wonderful. Do you want to share it and make everyone happy for you?',
              );
              setEmojiName('Very Good');
              setModalOpen(true);
              generateRandomId();
            } }>
            <Image source={ images.vGood } style={ styles.emojiImg } />
          </TouchableOpacity>
          <Text style={ styles.txtVgood }>VERY GOOD</Text>
        </View>
        <View style={ styles.goodEmojiView }>
          <TouchableOpacity
            onPress={ () => {
              setEmojiName('Good');
              setModalOpen(true);
              setMoodImage(images.good);
              setMoodText('Keep this good mood and the day will be smooth.');
              generateRandomId();
            } }>
            <Image source={ images.good } style={ styles.emojiImg } />
          </TouchableOpacity>
          <Text style={ styles.txtVgood }>GOOD</Text>
        </View>
      </View>

      <View style={ styles.neutralView }>
        <TouchableOpacity
          onPress={ () => {
            setEmojiName('Neutral');
            setModalOpen(true);
            setMoodImage(images.neutral);
            setMoodText(
              'Smile at yourself, something good may be will happen.',
            );
            generateRandomId();
          } }>
          <Image source={ images.neutral } style={ styles.emojiImg } />
        </TouchableOpacity>
        <Text style={ styles.txtVgood }>NEUTRAL</Text>
      </View>

      <View style={ styles.emojiTopView }>
        <View style={ styles.goodEmojiView }>
          <TouchableOpacity
            onPress={ () => {
              setEmojiName('Bad');
              setModalOpen(true);
              setMoodImage(images.bad);
              setMoodText(
                `Don't care about the bad things, try to look towards the good things.`,
              );
              generateRandomId();
            } }>
            <Image source={ images.bad } style={ styles.emojiImg } />
          </TouchableOpacity>
          <Text style={ styles.txtVgood }>Bad</Text>
        </View>
        <View style={ styles.goodEmojiView }>
          <TouchableOpacity
            onPress={ () => {
              setEmojiName('Very Bad');
              setModalOpen(true);
              setMoodImage(images.veryBad);
              setMoodText(
                `What happened? Do you want a hug? Tell me, let's discuss what to do together.`,
              );
              generateRandomId();
            } }>
            <Image source={ images.veryBad } style={ styles.emojiImg } />
          </TouchableOpacity>
          <Text style={ styles.txtVgood }>VERY BAD</Text>
        </View>
      </View>
      <Modal
        visible={ modalOpen }
        transparent
        onRequestClose={ () => {
          setModalOpen(false);
        } }>
        <View style={ styles.modalContainer }>
          <View style={ styles.contentContainer }>
            <Image source={ moodImage } style={ styles.emojiImg } />
            <Text style={ styles.motivationalText }>{ moodText }</Text>
            <Textinput
              customeStyle={ styles.input }
              placeholder="Type here..."
              onChangeText={ val => setNote(val) }
            />
            <View
              style={ {
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              } }>
              <Button
                container={ styles.button }
                title="Continue"
                onPress={ () => {
                  postUpload();
                } }
              />
              <Button
                container={ styles.button }
                title="Cancel"
                onPress={ () => {
                  setModalOpen(false);
                } }
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
