/**
 * @format
 */
import React, {PropTypes} from 'react';
import {StyleSheet, View, PixelRatio} from 'react-native';

export default class Divider extends React.Component {
  render() {
    return <View style={[styles.view, this.props.style]} />;
  }
}

const styles = StyleSheet.create({
  view: {
    height: 1 / PixelRatio.get(),
    // marginLeft: 56,
    backgroundColor: '#b2b2b2',
  },
});
