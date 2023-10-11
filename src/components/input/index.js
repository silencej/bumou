import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { hp, wp, rhp } from '../../constants';

const Textinput = props => {
  const {
    placeholder,
    keyboardType,
    onChangeText,
    value,
    secureTextEntry,
    onFocus,
    onBlur,
    customeStyle,
    editable,
  } = props;

  return (
    <TextInput
      style={ [styles.input, customeStyle] }
      placeholder={ placeholder }
      keyboardType={ keyboardType }
      value={ value }
      onChangeText={ onChangeText }
      placeholderTextColor={ '#787575' }
      secureTextEntry={ secureTextEntry }
      onFocus={ onFocus }
      onBlur={ onBlur }
      editable={ editable }
    />
  );
};
const styles = StyleSheet.create({
  input: {
    height: hp(6.2),
    width: wp(90),
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: 8,
    marginVertical: hp(1),
    paddingHorizontal: wp(3),
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 10,
  },
});
export default Textinput;
