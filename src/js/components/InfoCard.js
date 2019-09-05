/**
 * @format
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';

export default class InfoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
  };

  render() {
    const {
      style,
      title,
      children,
      onPress,
      titleChildren,
      directChildren,
    } = this.props;
    let disabled = !onPress;
    return (
      <TouchableOpacity
        style={[styles.card, style]}
        activeOpacity={0.82}
        disabled={disabled}
        onPress={onPress}>
        <View style={styles.top}>
          <View style={styles.marked} />
          <Text style={styles.title}>{title}</Text>
          {titleChildren}
        </View>
        <View style={styles.line} />
        <View style={{marginLeft: 18, marginTop: 10}}>{children}</View>
        {directChildren}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 2,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingRight: 18,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  marked: {
    width: 4,
    height: 18,
    backgroundColor: '#3296FA',
  },
  title: {
    fontSize: 18,
    color: '#333',
    marginLeft: 14,
    marginRight: 10,
  },
  line: {
    height: 1,
    backgroundColor: '#eee',
    marginLeft: 18,
  },
});
