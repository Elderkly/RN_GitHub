
import React, {Component} from 'react'
import {StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createSwitchNavigator,createAppContainer } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import setup from '../pages/setup'
import WelCome from '../pages/WelCome'

import Hot from '../pages/Hot'
import Trend from '../pages/Trend'
import Collection from '../pages/Collection'
import User from '../pages/User'

//  tabBar
const AppTabBar = createMaterialBottomTabNavigator({
  Hot: {
    screen: Hot,
    navigationOptions: {
      tabBarLabel: '热门',
      tabBarColor:'rgb(101,24,244)',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='ios-flame' color={tintColor} size={24} />
      ),
      tabBarOnPress:((e) => {
        StatusBar.setBackgroundColor('rgb(101,24,244)')
        e.navigation.navigate('Hot')
      })
    }
  },
  Trend: {
    screen: Trend,
    navigationOptions: {
      tabBarLabel: '趋势',
      tabBarColor:'rgb(31,101,255)',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='ios-podium' color={tintColor} size={24} />
      ),
      tabBarOnPress:((e) => {
        StatusBar.setBackgroundColor('rgb(31,101,255)')
        e.navigation.navigate('Trend')
      })
    }
  },
  Collection: {
    screen: Collection,
    navigationOptions: {
      tabBarLabel: '收藏',
      tabBarColor:'rgb(0,109,106)',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='ios-cube' color={tintColor} size={24} />
      ),
      tabBarOnPress:((e) => {
        StatusBar.setBackgroundColor('rgb(0,109,106)')
        e.navigation.navigate('Collection')
      })
    }
  },
  User: {
    screen: User,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarColor:'rgb(208,39,96)',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='ios-person' color={tintColor} size={24} />
      ),
      tabBarOnPress:((e) => {
        StatusBar.setBackgroundColor('rgb(208,39,96)')
        e.navigation.navigate('User')
      })
    }
  }
},{
  initialRouteName: 'Hot',
  activeTintColor: '#fff',
  inactiveTintColor: 'rgba(255,255,255,.5)',
  shifting: true, // 图标缩放效果
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
      header:'热门'
    }
  }
})

export const AppStackNavigaton = createAppContainer(AppCreateStackNavigator)