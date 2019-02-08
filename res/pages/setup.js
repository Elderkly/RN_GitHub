
import React, {Component} from 'react';
import {View} from 'react-native';

import SplashScreen from 'react-native-splash-screen'

type Props = {};
//  进行一些配置
export default class App extends Component<Props> {
  render() {
    const {navigation} = this.props
    setTimeout(() => {
      SplashScreen.hide();
      navigation.navigate('WelCome')
    },600)
      return (
        <View/>
      );
  }
}
