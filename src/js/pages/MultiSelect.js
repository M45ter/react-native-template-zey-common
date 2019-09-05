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

export default class MultiSelect extends BasePage {
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
      selected: new Map(),
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
      // let selected = this.props.navigation.getParam('selected', null);
      this.props.navigation.setParams({okPress: this.okPress});
      this.setState({
        data,
        // selected,
      });
    } else {
      this.props.navigation.pop();
    }
  }

  okPress = () => {
    if (this.props.navigation.state.params.callback) {
      let array = [];
      const {data, selected} = this.state;
      let keyName = this.props.navigation.getParam('keyName', 'key');
      data.map(item => {
        let checked = !!selected.get(item[keyName]);
        if (checked) {
          array.push(item);
        }
      });
      this.props.navigation.state.params.callback(array);
    }
    this.props.navigation.pop();
  };

  itemPress(item) {
    let keyName = this.props.navigation.getParam('keyName', 'key');
    this.setState(state => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(item[keyName], !selected.get(item[keyName])); // toggle
      return {selected};
    });
  }

  renderItem = ({item}) => {
    const {selected} = this.state;
    let keyName = this.props.navigation.getParam('keyName', 'key');
    let display = this.props.navigation.getParam('display', null);
    let checked = !!selected.get(item[keyName]);
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
