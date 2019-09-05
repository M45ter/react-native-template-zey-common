/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import {PermissionsAndroid, DeviceEventEmitter} from 'react-native';
import ApiService from '../net/ApiService';
import * as Event from '../constant/Event';

export default class ComUtils {
  static compareVersion(version1, version2) {
    if (version1 === version2) {
      return 0;
    }
    let arr1 = version1.split('.');
    let arr2 = version2.split('.');

    let minLen = Math.min(arr1.length, arr2.length);
    let index = 0;
    let diff = 0;
    while (
      index < minLen &&
      (diff = parseInt(arr1[index]) - parseInt(arr2[index])) == 0
    ) {
      index++;
    }
    if (diff == 0) {
      for (let i = index; i < arr1.length; i++) {
        if (parseInt(arr1[i]) > 0) {
          return 1;
        }
      }
      for (let i = index; i < arr2.length; i++) {
        if (parseInt(arr2[i]) > 0) {
          return -1;
        }
      }
      return 0;
    } else {
      return diff > 0 ? 1 : -1;
    }
  }

  static async checkPermission(
    permission,
    grantedCallback = () => {},
    deniedCallback = () => {},
  ) {
    try {
      const result = await PermissionsAndroid.check(permission);
      console.log('checkPermission result = ' + JSON.stringify(result));
      if (result) {
        console.log(permission + ' permission has granted');
        grantedCallback();
      } else {
        console.log(permission + ' permission has not granted');
        deniedCallback();
      }
    } catch (e) {}
  }

  static async requestPermission(
    permission,
    grantedCallback = () => {},
    deniedCallback = () => {},
    rationale,
  ) {
    try {
      const granted = await PermissionsAndroid.request(permission, rationale);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log(permission + ' permission granted');
        grantedCallback();
      } else {
        console.log(permission + ' permission denied');
        deniedCallback();
      }
    } catch (e) {}
  }

  static existInTree(tree, keyName, key, childrenName = 'children') {
    let nodes = [];
    for (let item of tree) {
      if (item[keyName] === key) {
        return true;
      } else if (item[childrenName] && item[childrenName].length > 0) {
        nodes = nodes.concat(item[childrenName]);
      }
    }
    if (nodes.length > 0) {
      // for (let node of nodes) {
      if (this.existInTree(nodes, keyName, key, childrenName)) {
        return true;
      }
      // }
    }
    return false;
  }

  /**
   * 格式化数字
   * @param  {[string | number]} number  [要格式化的数字]
   * @param  {[number]} decimals         [保留几位小数]
   * @param  {[boolean]} end_zero        [小数不足时是否补0]
   * @param  {[string]} dec_point        [小数点符号]
   * @param  {[string]} thousands_sep    [千分位符号]
   * @param  {[string]} roundtag         [舍入参数，默认 "ceil" 向上取,"floor"向下取,"round" 四舍五入]
   * @return {[string]} 格式化后的结果
   */
  static numberFormat(
    number,
    decimals,
    end_zero,
    dec_point,
    thousands_sep,
    roundtag,
  ) {
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    roundtag = roundtag || 'ceil'; //"ceil","floor","round"
    var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      endZero = typeof end_zero === 'undefined' ? false : end_zero,
      sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
      dec = typeof dec_point === 'undefined' ? '.' : dec_point,
      s = '',
      toFixedFix = function(n, prec) {
        var k = Math.pow(10, prec);
        console.log();

        return (
          '' +
          parseFloat(
            Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(
              prec * 2,
            ),
          ) /
            k
        );
      };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, '$1' + sep + '$2');
    }

    if (endZero && (s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
  }

  static messageCount() {
    ApiService.messageCount().then(ret => {
      DeviceEventEmitter.emit(Event.MSG_COUNT_CHANGED, ret);
    });
  }
}
