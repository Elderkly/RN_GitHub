
import React, {Component} from 'react';
import {Text, View,StyleSheet,StatusBar,FlatList,Image,ActivityIndicator} from 'react-native';

import NavigationBar from '../common/js/NavigationBar'

import {MaterialTopTabNavigator} from '../config/MaterialTopTabNavigator'

/*
   由于HOT页面的TopNavigator有些特殊
   获取的路由是TopNavigator的路由
   无法实现一二级页面的跳转
   所以将hot页面的路由导出用于在MaterialTopTabNavigator.js中进行跳转123
*/
export let Homenavigation = null

//  页面主容器
type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

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
  },
  itemsBox:{
    marginVertical: 5,
    borderWidth: 0.5,
    marginHorizontal: 10,
    backgroundColor:'#fff',
    borderRadius:2,
    paddingVertical: 5,
    paddingHorizontal:10,
    shadowColor: '#000',
    shadowOffset:{width:0.5,height:0.5},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation:2,
    borderColor:'#ddd'
  }
});
