/**
 * @format
 */
import React from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import BasePage from './BasePage';
import Style from '../constant/Style';
import ToastUtils from '../util/ToastUtils';

export default class SingleSelect extends BasePage {
  static navigationOptions = ({navigation}) => {
    let title = navigation.getParam('title');
    return {
      title: title ? title : '选择',
      headerRight: (
        <TouchableOpacity
          onPress={navigation.getParam('okPress')}
          style={{marginRight: 15}}
          activeOpacity={0.9}>
          <Text style={styles.headerRightText}>确定</Text>
        </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selected: null,
    };
  }

  static propTypes = {};

  /**
   * 初始化了状态之后，在第一次绘制 render() 之前
   * （能够使用setState()来改变属性 有且只有一次）
   */
  componentWillMount() {
    this.initData();
  }

  componentDidMount() {
    super.componentDidMount();
  }

  initData() {
    let data = this.props.navigation.getParam('data', null);
    if (data) {
      let selected = this.props.navigation.getParam('selected', null);
      this.props.navigation.setParams({okPress: this.okPress});
      this.setState({
        data,
        selected,
      });
    } else {
      this.props.navigation.pop();
    }
  }

  okPress = () => {
    if (!this.state.selected) {
      ToastUtils.show('没有选中任何项');
      return;
    }
    if (this.props.navigation.state.params.callback) {
      this.props.navigation.state.params.callback(this.state.selected);
    }
    this.props.navigation.pop();
  };

  itemPress(item) {
    this.setState({
      selected: item,
    });
  }

  renderItem = ({item}) => {
    const {selected} = this.state;
    let keyName = this.props.navigation.getParam('keyName', 'key');
    let display = this.props.navigation.getParam('display', null);
    let checked = selected && selected[keyName] === item[keyName];
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => this.itemPress(item)}>
        <View style={styles.item}>
          <Text style={styles.itemText}>
            {display ? display(item) : item.value}
          </Text>
          {checked ? (
            <Image source={require('../../res/img/ic_check.png')} />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <FlatList
        style={Style.container}
        contentContainerStyle={[{flexGrow: 1}]}
        data={this.state.data}
        ItemSeparatorComponent={() => <View style={{height: 1}} />}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  headerRightText: {
    fontSize: 18,
    color: '#3296FA',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
});
