import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {hp, wp, rhp} from '../../constants';

const Button = props => {
  const {onPress, title, container, enabled=true, secondary=false} = props;
  let style = StyleSheet.compose(styles.btnLogin, container)
  if (secondary) style = StyleSeet.compose(style, secondary)
  if (!enabled) style = StyleSeet.compose(style, disabled)
  if (!enabled) {
    return (
      <TouchableOpacity style={style}>
        <Text style={styles.btnText}>{title}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnLogin: {
    height: hp(6),
    width: wp(90),
    backgroundColor: '#000',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(5),
  },
  btnText: {
    color: '#fff',
    fontSize: rhp(24),
    fontWeight: '500',
    fontFamily: 'Paprika-Regular',
  },
  secondary: {
    backgroundColor: '#fff',
  },
  disabled: {
    backgroundColor: '#fff',
    color: '#eee',
  },
});
export default Button;
