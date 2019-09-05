/**
 * @format
 */
import React, {Component} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {IconFill} from '@ant-design/icons-react-native';
import {Icon} from '@ant-design/react-native';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: false,
    };
  }

  static propTypes = {
    clearSize: PropTypes.number,
    clearColor: PropTypes.string,
    onSubmitEditing: PropTypes.func,
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

  onSubmitEditing = text => {
    if (this.props.onSubmitEditing) {
      this.props.onSubmitEditing();
    }
  };

  render() {
    const {
      containerStyle,
      style,
      clearSize,
      clearColor,
      placeholder,
      ...restProps
    } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={styles.inputWrapper}>
          <Icon size={28} name="search" style={styles.search} />
          <TextInput
            style={[styles.text, style]}
            ref={el => (this.inputRef = el)}
            underlineColorAndroid="transparent"
            returnKeyType={'search'}
            {...restProps}
            onBlur={this.onInputBlur}
            onFocus={this.onInputFocus}
            onSubmitEditing={this.onSubmitEditing}
            placeholder={placeholder || '搜索关键字'}
          />
          {this.state.focus ? (
            <TouchableOpacity
              onPress={this.onInputClear}
              hitSlop={{top: 5, left: 5, bottom: 5, right: 5}}>
              <IconFill
                size={clearSize}
                name="close-circle"
                color={clearColor}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 11,
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 60,
  },
  inputWrapper: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEDEE',
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  text: {
    flex: 1,
    padding: 0,
    backgroundColor: 'transparent',
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 8,
    height: 30,
  },
  search: {
    marginHorizontal: 8,
  },
});
