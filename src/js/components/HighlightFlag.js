/**
 * @format
 */
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

export default class HighlightFlag extends Component {
  render() {
    const {style} = this.props;
    return <View style={[styles.flag, style]} />;
  }
}

const styles = StyleSheet.create({
  flag: {
    width: 4,
    height: 18,
    backgroundColor: '#3296FA',
  },
});
