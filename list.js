import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  StatusBar,
  Button,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import request from './request';

const Item = ({item, navigation}) => {
  return (
    <View style={styles.item}>
      {/* <Button
      onPress={() => navigation.navigate('details')}
      title={`View Details${id}`}
      color="#841584"
      accessibilityLabel="Learn more about this purple button">
      <View>
        <Text style={styles.title}>坐席账号</Text>
        <Text style={styles.title}>{account}</Text>
      </View>
      <View>
        <Text style={styles.title}>坐席姓名</Text>
        <Text style={styles.title}>{agent}</Text>
      </View>
    </Button> */}
      <TouchableHighlight onPress={() => navigation.navigate('details')}>
        <View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={styles.title}>坐席账号：</Text>
            <Text style={styles.title}>{item.item.account}</Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', width: 200}}>
            <Text style={styles.title}>工单编号：</Text>
            <Text style={styles.title}>{item.item.flowId}</Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listArray: [],
    };
  }

  // 获取呼叫记录
  getList() {
    return request({
      url: 'https://service-support-test.ikandy.cn/api/serviceRequest/list?pageIndex=1&pageSize=10&searchTenant=5db26f2697ff09ee4410f4a3&searchOrgAccount=5db26e7597ff09ee4410dcfd&agentId=5e8d3b1f381aa431a14ee6b4&timestamp=1627306160',
      method: 'GET',
    });
  }

  async componentDidMount() {
    const res = await this.getList();
    this.setState({listArray: res.result.list});
  }

  render() {
    const {navigation} = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.listArray}
          renderItem={item => <Item navigation={navigation} item={item} />}
          keyExtractor={item => item._id}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 24,
  },
});

export default List;
