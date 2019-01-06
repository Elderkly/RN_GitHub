
import React, {Component} from 'react';
import {View} from 'react-native';


type Props = {};
//  进行一些配置
export default class App extends Component<Props> {
  render() {
    const {navigation} = this.props
    navigation.navigate('WelCome')
      return (
        <View/>
      );
  }
}
