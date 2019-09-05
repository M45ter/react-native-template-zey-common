/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Provider} from '@ant-design/react-native';
import NavigationService from './router/NavigationService';
import {AppContainer} from './router';

import './net/Http';
import './util/Storage';
// import './util/JPush';
//import './util/CalendarConfig';
//import {Platform} from 'react-native';
//import JPushModule from 'jpush-react-native';
import ApiService from './net/ApiService';

// export default () => (
//   <Provider>
//     <AppContainer
//       ref={navigatorRef => {
//         NavigationService.setTopLevelNavigator(navigatorRef);
//       }}
//     />
//   </Provider>
// );

export default class extends Component {
  /*
  componentDidMount() {
    console.log('JPush add Listener');
    if (Platform.OS === 'android') {
      JPushModule.notifyJSDidLoad(resultCode => {
        if (resultCode === 0) {
        }
      });
    } else {
      JPushModule.setupPush();
    }

    this.receiveNotificationListener = event => {
      console.log('JPush 接收推送通知', event);
    };

    this.openNotificationListener = event => {
      console.log('JPush 打开通知', event);
      if (event.extras) {
        if (Platform.OS === 'android') {
          let obj = JSON.parse(event.extras);
          if (obj.id) {
            console.log('setReadForJPush: ' + obj.id);
            ApiService.setReadForJPush(obj.id).then(ret => {});
          }
        } else {
          let obj = event.extras;
          if (obj.id) {
            console.log('setReadForJPush: ' + obj.id);
            ApiService.setReadForJPush(obj.id).then(ret => {});
          }
          JPushModule.getBadge(badge => {
            JPushModule.setBadge(badge - 1, success => {});
          });
        }
      }
    };

    JPushModule.addReceiveNotificationListener(
      this.receiveNotificationListener,
    );

    JPushModule.addReceiveOpenNotificationListener(
      this.openNotificationListener,
    );
  }

  componentWillUnmount() {
    JPushModule.removeReceiveNotificationListener(
      this.receiveNotificationListener,
    );
    JPushModule.removeReceiveOpenNotificationListener(
      this.openNotificationListener,
    );
  }
  */

  render() {
    return (
      <Provider>
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}
