import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import {images} from '../../../assets/images';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Composer,
  Send,
} from 'react-native-gifted-chat';
import {hp} from '../../../constants';
import TrackPlayer from 'react-native-track-player';
const audioFilePath = require('../../../assets/audio/alarm.mp3'); // Replace with your audio file path and name
// Construct the audioDataURI
const audioDataURI = `file://${audioFilePath}`;

const Help = props => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    TrackPlayer.addEventListener('playback-queue-ended', async () => {
      try {
        const currentTrack = await TrackPlayer.getCurrentTrack();

        if (currentTrack === 0) {
          audioPlay();

          //   await TrackPlayer.play();
          console.log(
            '🚀 ~ file: index.js:24 ~ TrackPlayer.addEventListener ~ currentTrack:',
            currentTrack,
          );
        }
      } catch (error) {
        console.log('Error repeating track:', error);
      }
    });
    // Initialize TrackPlayer and play the audio on app start
    TrackPlayer.setupPlayer().then(() => {
      console.log('TrackPlayer initialized');
      //   audioPlay();
    });
  }, []);
  const audioPlay = () => {
    TrackPlayer.reset();
    TrackPlayer.add({
      id: 'local-track',
      url: audioFilePath,
      title: 'Local Track',
      artist: 'Your Artist',
      artwork: 'https://example.com/your-artwork.png',
      repeat: true,
    }).then(() => {
      console.log('Play track player');
      TrackPlayer.play();
    });
  };

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello how can I help you today!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          },
          right: {
            backgroundColor: '#FE4E8C',
          },
        }}
        textStyle={{
          left: {
            color: '#000',
          },
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const renderInputToolbar = props => {
    return (
      <InputToolbar
        primaryStyle={{marginBottom: hp(8)}}
        {...props}
        renderComposer={composerProps => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image source={images.keyboard} style={styles.imgKeyboard} />
            <Composer {...composerProps} />
          </View>
        )}
      />
    );
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <Image source={images.sendBtn} style={styles.imgSendBtn} />
      </Send>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={styles.emergencyTitle}>Are you in Emergency?</Text>
        <Text style={styles.emergencyDescription}>
          Press the button below to trigger an alarm that will help people know
          that you are in trouble.
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TouchableOpacity
          style={styles.sosContainer}
          onPress={() => {
            audioPlay();
          }}>
          <Image source={images.sos} style={styles.sos} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={() => TrackPlayer.reset()}
          style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.arrowView}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image source={images.leftArrow} style={styles.leftArrow} />
          </TouchableOpacity>
          <Text style={styles.txtMessege}>Help Center</Text>
          <Text>{'    '}</Text>
        </View>
        {/* <View style={ styles.blackLayer }>
                    <Image source={ images.userIcon } style={ styles.imgUserIcon } />
                    <TouchableOpacity>
                        <Image source={ images.option } style={ styles.imgOption } />
                    </TouchableOpacity>
                </View> */}
      </View>

      <GiftedChat
        messages={messages}
        alwaysShowSend={true}
        renderBubble={renderBubble}
        renderAvatar={null}
        textInputProps={styles.input}
        renderSend={renderSend}
        toolbar
        // renderInputToolbar={ renderInputToolbar }
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};
export default Help;
