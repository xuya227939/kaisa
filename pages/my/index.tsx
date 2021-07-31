import 'react-native-gesture-handler';
import React from 'react';
import {Text, View, Image} from 'react-native';

function My() {
  return (
    <View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: 100,
            height: 100,
            marginTop: 24,
          }}
          source={{
            uri: 'https://sight-world.oss-cn-hangzhou.aliyuncs.com/images/logo.png',
          }}
        />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          fontSize: 24,
          padding: 12,
          marginTop: 24,
          borderBottomWidth: 1,
          borderBottomColor: '#ddd',
        }}>
        <Text>支付</Text>
        <Text>></Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          fontSize: 24,
          padding: 12,
          borderBottomWidth: 1,
          borderBottomColor: '#ddd',
        }}>
        <Text>表情</Text>
        <Text>></Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          fontSize: 24,
          padding: 12,
          borderBottomWidth: 1,
          borderBottomColor: '#ddd',
        }}>
        <Text>设置</Text>
        <Text>></Text>
      </View>
    </View>
  );
}

export default My;
