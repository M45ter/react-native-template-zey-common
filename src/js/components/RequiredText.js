/**
 * @format
 */
import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';

export default class RequiredText extends Component {
  static propTypes = {
    optional: PropTypes.bool,
    asteriskStyle: PropTypes.object,
  };

  static defaultProps = {
    optional: false,
    asteriskStyle: null,
  };

  render() {
    const {style, children, optional, asteriskStyle, ...restProps} = this.props;
    return (
      <Text style={[styles.content, style]} {...restProps}>
        {optional ? null : (
          <Text style={[styles.asterisk, asteriskStyle]}>*</Text>
        )}
        {children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  asterisk: {
    color: '#F25643',
  },
  content: {
    fontSize: 18,
    color: '#333',
  },
});
