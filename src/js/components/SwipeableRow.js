/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import PropTypes from 'prop-types';

export default class SwipeableRow extends Component {
  static propTypes = {
    rightActions: PropTypes.array,
  };

  renderRightAction = (item, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [item.x, 0],
    });
    const pressHandler = () => {
      this.close();
      item.onPress();
    };
    return (
      <Animated.View style={{flex: 1, transform: [{translateX: trans}]}}>
        <RectButton
          style={[styles.rightAction, {backgroundColor: item.color}]}
          onPress={pressHandler}>
          <Text style={styles.actionText}>{item.text}</Text>
        </RectButton>
      </Animated.View>
    );
  };
  renderRightActions = progress => {
    const {rightActions} = this.props;
    let width;
    rightActions.map(item => {
      width = item.x;
    });
    return (
      <View style={{width: width, flexDirection: 'row'}}>
        {rightActions.map(item => {
          return this.renderRightAction(item, progress);
        })}
      </View>
    );
  };
  updateRef = ref => {
    this._swipeableRow = ref;
  };
  close = () => {
    this._swipeableRow.close();
  };

  render() {
    const {children} = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        rightThreshold={40}
        renderRightActions={this.renderRightActions}>
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
