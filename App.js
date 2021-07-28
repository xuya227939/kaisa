import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {enableScreens} from 'react-native-screens';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {Provider} from 'mobx-react';
import RootStore from './mobx';

enableScreens();
const Stack = createNativeStackNavigator();

const Tab = createMaterialBottomTabNavigator();

import Details from './details.js';
import List from './list.js';
import My from './my.js';
import WihteBoard from './wihteBoard.js';

function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" options={{title: '首页'}} component={List} />
      <Stack.Screen
        name="details"
        options={{title: '详情页'}}
        component={Details}
      />
    </Stack.Navigator>
  );
}

function MyScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="my" options={{title: '我的'}} component={My} />
    </Stack.Navigator>
  );
}

function WhiteBoardScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="whiteBoard"
        options={{title: '白板'}}
        component={WihteBoard}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <Provider rootStore={RootStore}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="首页" component={HomeStackScreen} />
          <Tab.Screen name="白板" component={WhiteBoardScreen} />
          <Tab.Screen name="我的" component={MyScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
