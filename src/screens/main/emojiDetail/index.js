import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  TextInput,
  Modal,
} from 'react-native';
import styles from './styles';
import { images } from '../../../assets/images';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
import EmojiDetailCom from './EmojiDetailCom';

import { useDispatch, useSelector } from 'react-redux';
// import { LoaderContext } from '../../../components/appLoading';
import Button from '../../../components/button';
import Textinput from '../../../components/input';
import moment from 'moment';
import { hp, wp } from '../../../constants';

// import { useFetch } from '@src/hooks'
import api from '@src/data'

import { formatDatetime } from '@src/utils'

export default function EmojiDetail (props) {
  // const {currentUser} = props?.route?.params;
  const [emojiCard, setEmojiCard] = useState([]);
  // const setLoader = useSetLoader();
  const [currentUser, setCurrentUser] = useState(null);
  const [comment, setComment] = useState('');
  const [commentModal, setCommentModal] = useState(false);
  const [userComment, setUserComment] = useState([]);
  const [postItem, setPostItem] = useState(null);

  const getPostsQueryRes = api.useGetPostsQuery()
  console.log('getPostsQueryRes: ', getPostsQueryRes)

  const [createCommentMutation, createCommentRes] = api.useCreateCommentMutation()
  useEffect(()=>{
  }, [createCommentRes.data])

  useEffect(() => {
    // getAllPost();
    // getUserData();
    if (!!getPostsQueryRes.data) {
      setEmojiCard(getPostsQueryRes.data)
    }
  }, [getPostsQueryRes.data]);

  useEffect(() => {
    updatedPost(emojiCard);
  }, [emojiCard]);

  // const getAllPost = async () => {
  //   // const posts = fetch(`/posts`)
  //   const res = await getPostsQuery()
  //   console.log(`res: `, res)
  //
  //   const posts = res.data
  //   setEmojiCard(posts)
  //   // setLoader(true);
  //   // await firestore()
  //   //   .collection('usersPost')
  //   //   .doc('allPost')
  //   //   .onSnapshot(
  //   //     snapshot => {
  //   //       const allPost = snapshot?.data()?.post;
  //   //       let reverseArray = allPost.reverse();
  //   //       // updatedPost(allPost);
  //   //
  //   //       setEmojiCard(reverseArray);
  //   //       setLoader(false);
  //   //     },
  //   //     error => {
  //   //       console.log(error);
  //   //       setLoader(false);
  //   //     },
  //   //   );
  // };

  const updatedPost = allPost => {
    // console.log(postItem);
    if(postItem) {
      const filteredPost = allPost.filter(
        post => post?.ID === postItem?.ID,
      );
      // console.log(
      //   '🚀 ~ file: index.js:54 ~ getAllPost ~ filteredPost:',
      //   filteredPost,
      // );
      setPostItem(filteredPost[0]);
    }
  };

  // const getUserData = async () => {
  // setLoader(true);
  // const uid = auth().currentUser.uid;
  // await firestore()
  //   .collection('users')
  //   .doc(uid)
  //   .get()
  //   .then(documentSnapshot => {
  //     setCurrentUser(documentSnapshot._data);
  //     setLoader(false);
  //   })
  //   .catch(e => {
  //     setLoader(false);
  //     console.log(e);
  //   });
  // };

  const commentFun = () => {
    // const currentDate = new Date();
    // const formattedDate = moment(currentDate).format('MMMM Do YYYY / h:mm a');
    // let commentObj = {
    //   userName: currentUser?.userName,
    //   userId: currentUser?.uid,
    //   date: formattedDate,
    //   commentText: comment,
    // };
    if (!postItem?.ID) {
      alert("no postItem.ID")
      return
    }
    createCommentMutation({
      PostID: postItem.ID,
      Text: comment,
    })
    setComment('');

    // const docRef = firestore().collection('usersPost').doc('allPost');
    // docRef
    //   .get()
    //   .then(docSnapshot => {
    //     if(docSnapshot.exists) {
    //       const postArray = docSnapshot.get('post') || [];
    //       const postIndex = postArray.findIndex(
    //         post => post.postId === postItem?.postId,
    //       );
    //       if(postIndex !== -1) {
    //         const currentComments = postArray[postIndex].comments || [];
    //         currentComments.push(commentObj);
    //         postArray[postIndex].comments = currentComments;
    //         return docRef.update({ post: postArray });
    //       } else {
    //         throw new Error('Post not found in the array.');
    //       }
    //     } else {
    //       throw new Error('Document "allPost" does not exist.');
    //     }
    //   })
    //   .then(() => {
    //     console.log('Comment object added successfully.');
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  const renderItem = (item, index) => {
    // console.log(`item: `, item)
    const userName = item?.item?.From?.Name;
    const text = item?.item?.Text;
    const time = item?.item?.CreatedAt;
    const timeString = !!time ? formatDatetime(time) : ""
    const firstLetter = userName ? userName.charAt(0) : '';
    return (
      <View
        style={ { flexDirection: 'row', marginHorizontal: 10, marginVertical: 5 } }>
        <View style={ styles.userIcon }>
          <Text style={ { fontSize: 25, color: '#fff', fontWeight: 'bold' } }>
            { firstLetter }
          </Text>
        </View>
        <View style={ styles.commentView }>
          <Text style={ { fontSize: 15, color: '#fff', fontWeight: 'bold' } }>
            { userName }
          </Text>
          <Text style={ { fontSize: 15, color: '#fff', textAlign: 'justify' } }>
            { text }
          </Text>
          <Text style={ { fontSize: 15, color: '#fff', textAlign: 'justify' } }>
            { timeString }
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={ styles.container }>
      <View style={ styles.headerView }>
        {/* <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image source={images.leftArrow} style={styles.leftArrow} />
            </TouchableOpacity> */}
      </View>
      <View style={ styles.flatlistContainer }>
        <FlatList
          data={ emojiCard }
          renderItem={ ({ item, index }) => {
            return (
              <EmojiDetailCom
                item={ item }
                index={ index }
                currentUser={ currentUser }
                onPressComment={ () => {
                  setPostItem(item);
                  setCommentModal(true);
                } }
              />
            );
          } }
        />
      </View>
      <Modal animationType="slide" transparent={ true } visible={ commentModal }>
        <View style={ styles.centeredView }>
          <View style={ styles.modalView }>
            <TouchableOpacity
              onPress={ () => setCommentModal(false) }
              style={ styles.closeBtn }>
              <Image source={ images.closeBtn } style={ styles.closeImg } />
            </TouchableOpacity>

            <FlatList data={ postItem?.Comments } renderItem={ renderItem } />

            <View style={ styles.devider }></View>
            <View style={ styles.inputContainer }>
              <TextInput
                value={ comment }
                onChangeText={ val => setComment(val) }
                placeholder="Write a comment"
                placeholderTextColor={ '#00000050' }
                style={ styles.input }
              />
              <TouchableOpacity
                onPress={ () => {
                  commentFun();
                } }>
                <Image source={ images.sendBtn } style={ styles.inputImg } />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
