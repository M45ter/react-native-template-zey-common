/**
 * @format
 */
import {Dimensions, PixelRatio} from 'react-native';

export const deviceWidth = Dimensions.get('window').width; // 设备的宽度
export const deviceHeight = Dimensions.get('window').height; // 设备的高度

export const fontScale = PixelRatio.getFontScale(); // 返回字体大小缩放比例

const pixelRatio = PixelRatio.get(); // 当前设备的像素密度

//当前设计针对尺寸
const designWidth = 750;
const designHeight = 1334;
const defaultPixel = 2; // iphone6的像素密度
// px转换成dp
const w2 = designWidth / defaultPixel;
const h2 = designHeight / defaultPixel;
const scale = Math.min(deviceHeight / h2, deviceWidth / w2); // 获取缩放比例

//计算手机屏幕宽度对应设计图宽度的单位宽度
export const unitWidth = deviceWidth / w2;
//计算手机屏幕高度对应设计图高度的单位高度
export const unitHeight = deviceHeight / h2;
