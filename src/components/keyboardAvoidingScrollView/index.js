import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

export const KeyboardAvoidingScrollView = props => {
  const { children, isScroll } = props;
  const [scrollViewHeight, setScrollViewHeight] = useState(
    Dimensions.get('window').height,
  );
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardHide,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const handleKeyboardShow = event => {
    const keyboardHeight = event.endCoordinates.height;
    const screenHeight = Dimensions.get('window').height;
    const extraHeight = screenHeight - keyboardHeight;
    setScrollViewHeight(extraHeight);
  };

  const handleKeyboardHide = () => {
    const screenHeight = Dimensions.get('window').height;
    setScrollViewHeight(screenHeight);
  };
  return (
    <KeyboardAvoidingView
      { ...(Platform.OS === 'ios'
          ? { behavior: 'padding' }
          : { behavior: 'height' }) }
      style={ { flex: 1 } }>
      { isScroll ?
        <ScrollView
          showsVerticalScrollIndicator={ false }
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={ { flexGrow: 1 } }
          style={ { height: scrollViewHeight } }>
          { children }
        </ScrollView> : <>{children}</>
      }
    </KeyboardAvoidingView>
  );
};
