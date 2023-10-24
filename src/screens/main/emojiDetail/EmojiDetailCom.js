import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  TextInput,
  Modal,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import {images} from '../../../assets/images';
// import firestore from '@react-native-firebase/firestore';

import {LoaderContext} from '../../../components/appLoading';
import Button from '../../../components/button';
import moment from 'moment';
import {hp, wp} from '../../../constants';

import { formatDatetime } from '@src/utils'
import { selectProfile } from '@src/redux/userSlice'
import { useSelector } from 'react-redux'

import api from '@src/data'

const EmojiDetailCom = props => {
  const {item, index, currentUser, onPressComment} = props;

  const profile = useSelector(selectProfile)
  // const {setLoader} = useContext(LoaderContext);
  const [like, setLike] = useState(item?.Likes.includes(l=>l.FromID===profile.ID));

  // const commentlength = item?.comments?.length;
  // const likeLength = item?.likes?.length;

  const [createLikeMutation, createLikeRes] = api.useCreateLikeMutation()
  const [deleteLikeMutation, deleteLikeRes] = api.useDeleteLikeMutation()
  useEffect(()=>{

  }, [createLikeRes.data])
  useEffect(()=>{

  }, [deleteLikeRes.data])

  const likeFun = async item => {
    setLike(!like);
    if (like && item?.ID) {
      deleteLikeMutation(item.ID)
    }
    if (!like && item?.ID) {
      createLikeMutation({
        PostID: item.ID,
      })
    }

    // const currentDate = new Date();
    // // const formattedDate = moment(currentDate).format('MMMM Do YYYY / h:mm a');
    // const formattedDate = formatDatetime(Date().toISOString())
    // let obj = {
    //   userName: currentUser?.userName,
    //   userId: currentUser?.uid,
    //   date: formattedDate,
    // };
    // const docRef = firestore().collection('usersPost').doc('allPost');
    // docRef
    //   .get()
    //   .then(docSnapshot => {
    //     if (docSnapshot.exists) {
    //       const postArray = docSnapshot.get('post') || [];
    //
    //       const postIndex = postArray.findIndex(
    //         post => post.postId === item.postId,
    //       );
    //
    //       if (postIndex !== -1) {
    //         const currentLikes = postArray[postIndex].likes || [];
    //         console.log(like);
    //         if (like === false) {
    //           currentLikes.push(obj);
    //           postArray[postIndex].likes = currentLikes;
    //           return docRef.update({post: postArray});
    //         } else {
    //           const currentLikes = postArray[postIndex].likes || [];
    //           const likeIndex = currentLikes.findIndex(
    //             like =>
    //               like.userId === obj.userId &&
    //               like.userName === obj.userName &&
    //               like.date === obj.date,
    //           );
    //
    //           if (likeIndex !== -1) {
    //             currentLikes.splice(likeIndex, 1);
    //
    //             postArray[postIndex].likes = currentLikes;
    //
    //             return docRef.update({post: postArray});
    //           } else {
    //             throw new Error('Like object not found in the array.');
    //           }
    //         }
    //       } else {
    //         throw new Error('Post not found in the array.');
    //       }
    //     } else {
    //       throw new Error('Document "allPost" does not exist.');
    //     }
    //   })
    //   .then(() => {
    //     console.log('Like object added to the post likes array successfully.');
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  return (
    <SafeAreaView style={styles.card}>
      <View style={styles.nameAndDateContainer}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.userAvatar}>
            {item?.Mood === 'Very Bad' ? (
              <Image source={images.veryBad} style={styles.emojiImg} />
            ) : item?.Mood === 'Bad' ? (
              <Image source={images.bad} style={styles.emojiImg} />
            ) : item?.Mood === 'Neutral' ? (
              <Image source={images.neutral} style={styles.emojiImg} />
            ) : item?.Mood === 'Good' ? (
              <Image source={images.good} style={styles.emojiImg} />
            ) : item?.Mood === 'Very Good' ? (
              <Image source={images.vGood} style={styles.emojiImg} />
            ) : null}
          </View>
          <Text style={styles.emojiName}>{item?.userName}</Text>
        </View>
        <Text style={styles.emojiDate}>{formatDatetime(item?.Date)}</Text>
      </View>
      <View style={styles.descriptionView}>
        <Text style={styles.descriptionText}>{item?.Desc}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => {
            likeFun(item);
          }}>
          <View style={styles.buttonLikeContainer}>
            {like === false ? (
              <Image source={images.likeIcon} style={styles.likeButton} />
            ) : (
              <Image source={images.likeColorIcon} style={styles.likeButton} />
            )}
            <Text style={styles.likeText}>Like</Text>
            <Text style={styles.likeText}>{item?.Likes?.length}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.buttonCommentContainer}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={onPressComment}>
            <Image source={images.commentIcon} style={styles.commentButton} />
            <Text style={styles.commentText}>Comment</Text>
          </TouchableOpacity>
          <Text style={styles.commentText}>{item?.Comments?.length}</Text>
        </View>
      </View>

      {/* <Modal animationType="slide" transparent={true} visible={commentModal}>
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <TouchableOpacity
          onPress={() => setCommentModal(false)}
          style={styles.closeBtn}>
          <Image source={images.closeBtn} style={styles.closeImg} />
          </TouchableOpacity>
          <View style={styles.inputContainer}>
          <TextInput
          value={comment}
          onChangeText={val => setComment(val)}
          placeholder="Write a comment"
          placeholderTextColor={'#00000050'}
          style={styles.input}
          />
          <TouchableOpacity
          onPress={() => {
          commentFun();
          }}>
          <Image source={images.sendBtn} style={styles.inputImg} />
          </TouchableOpacity>
          </View>
          <FlatList data={userComment} renderItem={renderItem} />

          <View style={styles.devider}></View>
          </View>
          </View>
          </Modal> */}
    </SafeAreaView>
  );
};
export default EmojiDetailCom;
