/**
 * @format
 */
import React from 'react';
import {StyleSheet, TouchableOpacity, Text, Platform} from 'react-native';
import PropTypes from 'prop-types';

export default class NorBtn extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    textStyle: PropTypes.object,
  };

  render() {
    const {onPress, style, textStyle, text} = this.props;
    let disabled;
    disabled = !onPress;
    return (
      <TouchableOpacity
        style={[styles.btnView, disabled && styles.disabledStyle, style]}
        onPress={onPress}
        activeOpacity={0.9}
        disabled={disabled}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btnView: {
    height: 44,
    backgroundColor: '#3296FA',
    borderRadius: 2,
    ...Platform.select({
      ios: {
        overflow: 'hidden', //React-Native borderRadius 在IOS端失效的问题
      },
      android: {},
    }),
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledStyle: {
    backgroundColor: '#a8a8a8',
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});
