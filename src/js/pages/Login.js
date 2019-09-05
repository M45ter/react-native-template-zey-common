/**
 * @format
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import JPushModule from 'jpush-react-native';
import Style from '../constant/Style';
import ClearableTextInput from '../components/ClearableTextInput';
import NorBtn from '../components/NorBtn';
import ApiService from '../net/ApiService';
import BasePage from './BasePage';
import SplashScreen from 'react-native-splash-screen';
import {unitHeight} from '../util/ScreenUtil';

export default class Login extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  /**
   * 初始化了状态之后，在第一次绘制 render() 之前
   * （能够使用setState()来改变属性 有且只有一次）
   */
  componentWillMount() {
    // super.componentWillMount();
    storage
      .load({
        key: 'login',
      })
      .then(ret => {
        this.setState({
          username: ret.username,
          password: ret.password,
        });
      })
      .catch(e => {});
    storage
      .load({
        key: 'loginRes',
      })
      .then(ret => {
        if (ret && ret.token && ret.userId) {
          let alias = ret.userId;
          if (alias.includes('-')) {
            alias = alias.replace(/-/g, '');
          }
          JPushModule.setAlias(alias, success => {
            console.log('setAlias ', success);
          });
          this.props.navigation.navigate('Home');
        }
      })
      .catch(e => {});
  }

  componentDidMount() {
    super.componentDidMount();
    SplashScreen.hide();
    console.log('unitHeight: ' + unitHeight);
  }

  usernameNext = () => {
    if (this.mPwdInput) {
      this.mPwdInput.focus();
    }
  };

  usernameChange = username => {
    this.setState({username});
  };

  passwordChange = password => {
    this.setState({password});
  };

  login = () => {
    ApiService.login({
      username: this.state.username,
      password: this.state.password,
    }).then(ret => {
      storage.save({
        key: 'login',
        data: {
          username: this.state.username,
          password: this.state.password,
        },
      });
      storage.save({
        key: 'loginRes',
        data: ret,
      });
      let alias = ret.userId;
      if (alias.includes('-')) {
        alias = alias.replace(/-/g, '');
      }
      JPushModule.setAlias(alias, success => {
        console.log('setAlias ', success);
      });
      this.props.navigation.navigate('Home');
    });
  };

  render() {
    return (
      <View style={Style.whiteContainer}>
        <Image
          style={styles.logo}
          source={require('../../res/img/login_logo.png')}
        />
        <View style={styles.row}>
          <Text style={styles.preText}>账号</Text>
          <ClearableTextInput
            containerStyle={{flex: 1, marginLeft: 56}}
            style={styles.input}
            onChangeText={this.usernameChange}
            value={this.state.username}
            placeholder="请输入账号"
            returnKeyType={'next'}
            onSubmitEditing={this.usernameNext}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.line} />
        <View style={[styles.row, {marginTop: unitHeight * 20}]}>
          <Text style={styles.preText}>密码</Text>
          <ClearableTextInput
            containerStyle={{flex: 1, marginLeft: 56}}
            style={styles.input}
            secureTextEntry={true}
            onChangeText={this.passwordChange}
            value={this.state.password}
            placeholder="请输入密码"
            onSubmitEditing={this.login}
            returnKeyType={'go'}
            ref={input => (this.mPwdInput = input)}
          />
        </View>
        <View style={styles.line} />
        <NorBtn
          style={styles.btn}
          onPress={this.login}
          text={'登录'}
          textStyle={{fontSize: 18}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    marginTop: unitHeight * 75,
    marginBottom: unitHeight * 60,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  line: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 16,
    marginTop: unitHeight * 10,
  },
  preText: {
    marginLeft: 4,
    color: '#333',
    fontSize: 18,
  },
  input: {
    fontSize: 18,
  },
  btn: {
    height: unitHeight * 50,
    backgroundColor: '#3296FA',
    borderRadius: 4,
    marginHorizontal: 16,
    marginTop: unitHeight * 21,
  },
});
