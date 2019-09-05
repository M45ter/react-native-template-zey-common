/**
 * desc：
 * author：
 * date：
 * @format
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, View, Image, Text} from 'react-native';

export default class EmptyView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../res/img/empty_img.png')} />
        <Text style={{marginTop: 10}}>暂时还没有内容</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
