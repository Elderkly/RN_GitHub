
import React, {Component} from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import {createSwitchNavigator,createAppContainer,createStackNavigator } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
//  配置页面
import setup from '../pages/setup'
import WelCome from '../pages/WelCome'
//  一级页面
import Hot from '../pages/hot'
import Trend from '../pages/Trend'
import Collection from '../pages/Collection'
import User from '../pages/User'
//  二级页面
import Hot_SetTab from '../pages/Hot-setTab'
import Hot_sortTab from '../pages/Hot-sortTab'
import Hot_details from '../pages/Hot-details'

import User_about from '../pages/User-about'
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
        // StatusBar.setBackgroundColor('rgb(101,24,244)')
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
      // tabBarOnPress:((e) => {
      //   StatusBar.setBackgroundColor('rgb(31,101,255)')
      //   e.navigation.navigate('Trend')
      // })
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
      // tabBarOnPress:((e) => {
      //   StatusBar.setBackgroundColor('rgb(0,109,106)')
      //   e.navigation.navigate('Collection')
      // })
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
      // tabBarOnPress:((e) => {
      //   StatusBar.setBackgroundColor('rgb(208,39,96)')
      //   e.navigation.navigate('User')
      // })
    }
  }
},{
  initialRouteName: 'Hot',
  activeTintColor: '#fff',
  inactiveTintColor: 'rgba(255,255,255,.5)',
  shifting: true, // 图标缩放效果
})
//  页面常规路由配置
export const AppCreateStackNavigator = createStackNavigator({
  TabBar: {
    screen: AppTabBar,
    navigationOptions: {
      header:null,
    }
  },
  Hot_SetTab:{
    screen: Hot_SetTab,
    navigationOptions: {
      header:null,
    }
  },
  Hot_sortTab:{
    screen:Hot_sortTab,
    navigationOptions: {
      header:null
    }
  },
  Hot_details:{
    screen:Hot_details,
    navigationOptions: {
      header:null
    }
  },
  User_about:{
    screen:User_about,
    navigationOptions: {
      header:null
    }
  }
},{
  headerMode:'float'
})
//  初始化 createSwitchNavigator页面只显示一次
const AppCreateSwitchNavigator = createSwitchNavigator({
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
    screen:AppCreateStackNavigator,
    navigationOptions:{
      header:'热门'
    }
  }
})

export const AppStackNavigaton = createAppContainer(AppCreateSwitchNavigator)