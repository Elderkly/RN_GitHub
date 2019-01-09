
import React, {Component} from 'react';
import {Text, View,StyleSheet,StatusBar,FlatList,Image,ActivityIndicator} from 'react-native';

import NavigationBar from '../common/js/NavigationBar'

import {MaterialTopTabNavigator} from '../config/MaterialTopTabNavigator'

//  页面主容器
type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  initTopTabNavigato() {

  }

  render() {
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
