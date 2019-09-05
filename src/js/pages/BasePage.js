/**
 * @format
 */
import {Component} from 'react';
import {Platform, StatusBar} from 'react-native';

export default class BasePage extends Component {
  /**
   * 初始化了状态之后，在第一次绘制 render() 之前
   * （能够使用setState()来改变属性 有且只有一次）
   */
  // componentWillMount() {
  //   this._navListener = this.props.navigation.addListener('didFocus', () => {
  //     if (Platform.OS === 'android') {
  //       if (Platform.Version >= 23) {
  //         StatusBar.setBarStyle('dark-content');
  //         StatusBar.setBackgroundColor('#FFFFFF');
  //       }
  //     }
  //   });
  // }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setHidden(false, true);
      if (Platform.OS === 'android') {
        if (Platform.Version >= 23) {
          StatusBar.setTranslucent(false);
          StatusBar.setBackgroundColor('#FFF');
        }
      }
    });
  }

  /**
   * 组件要被从界面上移除的时候，就会调用 componentWillUnmount()
   * （不能够使用setState()来改变属性 有且只有一次调用）
   */
  componentWillUnmount() {
    if (this._navListener) {
      this._navListener.remove();
    }
  }
}
