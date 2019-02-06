
import React, {Component} from 'react';
import {View,StyleSheet} from 'react-native';

import NavigationBar from '../common/js/NavigationBar'

import {TrendTopTabNavigator,getPagesData} from '../config/MaterialTopTabNavigator'

getPagesData('flag_language')

//  页面主容器
export default class App extends Component{
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <View style={styles.container}>
          <NavigationBar
              title={'趋势'}
              style={{
                backgroundColor:'rgb(31,101,255)'
              }}
          />
          <TrendTopTabNavigator/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
