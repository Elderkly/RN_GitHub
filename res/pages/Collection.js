
import React, {Component} from 'react';
import {Text, View, StyleSheet, WebView,TextInput} from 'react-native';

import NavigationBar from '../common/js/NavigationBar'
import CollectionHot from './Collection-hot'
import CollectionTrend from './Collection-trend'

import {createMaterialTopTabNavigator,createAppContainer} from 'react-navigation'

const CollectionPage = {
  hot:{
    screen: CollectionHot,
    navigationOptions: {
      tabBarLabel: '热门'
    }
  },
  trend:{
    screen: CollectionTrend,
    navigationOptions: {
      tabBarLabel: '趋势'
    }
  },
}

const CollectionNavigationTabStyle = {
  lazy:true,  //  懒加载
  tabBarOptions: {
    upperCaseLabel: false,//是否使标签大写，默认为true
    scrollEnabled: false ,//是否支持 选项卡滚动，默认false
    style: {
      backgroundColor: 'rgb(0,109,106)'
    },
    indicatorStyle: {
      height: 2,
      backgroundColor: 'white',
    },//标签指示器的样式
    labelStyle: {
      fontSize: 13,
      marginTop: 6,
      marginBottom: 6,
    },//文字的样式
  }
}

const CollectionTopNavigation = createAppContainer(createMaterialTopTabNavigator(CollectionPage,CollectionNavigationTabStyle))


type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'收藏'}
          style={{
            backgroundColor:'rgb(0,109,106)'
          }}
        />
        <CollectionTopNavigation/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
