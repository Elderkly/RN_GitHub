
import React, {Component} from 'react';
import {View,StyleSheet} from 'react-native';

import NavigationBar from '../common/js/NavigationBar'

import {MaterialTopTabNavigator,getPagesData} from '../config/MaterialTopTabNavigator'

/*
   由于HOT页面的TopNavigator有些特殊
   获取的路由是TopNavigator的路由
   无法实现一二级页面的跳转
   所以将hot页面的路由导出用于在MaterialTopTabNavigator.js中进行跳转
*/
export let Homenavigation = null

getPagesData('flag_key')

//  页面主容器
export default class App extends Component{
  constructor(props) {
    super(props)
  }

  render() {
    const {navigation} = this.props
    Homenavigation = navigation
    // StatusBar.setBackgroundColor('rgb(101,24,244)')
    return (
        <View style={styles.container}>
          <NavigationBar
              title={'热门'}
              style={{
                backgroundColor:'rgb(101,24,244)'
              }}
          />
          <MaterialTopTabNavigator/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
