/**
 * @format
 */
import React, {Component} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
// import {Icon} from "@ant-design/react-native";
import {IconFill} from '@ant-design/icons-react-native';

export default class ClearableTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: false,
    };
  }

  static propTypes = {
    clearSize: PropTypes.number,
    clearColor: PropTypes.string,
  };

  static defaultProps = {
    clearSize: 22,
    clearColor: 'gray',
  };

  onInputClear = () => {
    const {onChangeText} = this.props;
    if (this.inputRef) {
      this.inputRef.clear();
    }
    if (onChangeText) {
      onChangeText('');
    }
  };

  onInputBlur = () => {
    this.setState(
      {
        focus: false,
      },
      () => {
        if (this.props.onBlur) {
          this.props.onBlur();
        }
      },
    );
  };

  onInputFocus = () => {
    this.setState(
      {
        focus: true,
      },
      () => {
        if (this.props.onFocus) {
          this.props.onFocus();
        }
      },
    );
  };

  focus = () => {
    if (this.inputRef) {
      this.inputRef.focus();
    }
  };

  render() {
    const {
      containerStyle,
      style,
      clearSize,
      clearColor,
      ...restProps
    } = this.props;

    return (
      <View style={[styles.container, containerStyle]}>
        <TextInput
          style={[styles.text, style]}
          ref={el => (this.inputRef = el)}
          underlineColorAndroid="transparent"
          {...restProps}
          onBlur={this.onInputBlur}
          onFocus={this.onInputFocus}
        />
        {this.state.focus ? (
          <TouchableOpacity
            onPress={this.onInputClear}
            hitSlop={{top: 5, left: 5, bottom: 5, right: 5}}>
            <IconFill size={clearSize} name="close-circle" color={clearColor} />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    padding: 0,
    backgroundColor: 'transparent',
    fontSize: 17,
    color: 'black',
  },
});
