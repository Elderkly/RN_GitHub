
import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import {createSwitchNavigator,createAppContainer } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import setup from '../pages/setup'
import WelCome from '../pages/WelCome'
import home from '../pages/home'
import hot from '../pages/hot'

//  tabBar
const AppTabBar = createMaterialBottomTabNavigator({
  home: {
    screen: home,
    navigationOptions: {
      tabBarLabel: '主页',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='ios-home' color={tintColor} size={24} />
      ),
    }
  },
  hot: {
    screen: hot,
    navigationOptions: {
      tabBarLabel: '热门',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='ios-settings' color={tintColor} size={24} />
      ),
    }
  }
},{
  initialRouteName: 'home',
  // order: ['Settings', 'Home'],
  activeTintColor: 'red',
  inactiveTintColor: '#000',
  // 缩放图标的效果
  shifting: false, // 默认在大于3个路由时为true, 如果显式的设置为true了则少于3个时也会显示效果
  barStyle: {
    backgroundColor: '#fff',
  }
})


//  初始化 createSwitchNavigator页面只显示一次
const AppCreateStackNavigator = createSwitchNavigator({
  setup:{
    screen:setup,
    navigationOptions:{
      header:null,
    }
  },
  WelCome:{
    screen: WelCome,
    navigationOptions:{
      header:null
    }
  },
  TabBar:{
    screen:AppTabBar,
    navigationOptions:{
      header:null
    }
  }
})

export const AppStackNavigator = createAppContainer(AppCreateStackNavigator)