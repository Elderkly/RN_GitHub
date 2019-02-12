
import React, {Component} from 'react';

import {AsyncStorage, DeviceEventEmitter} from 'react-native'

import SplashScreen from 'react-native-splash-screen'

import {AppStackNavigaton} from '../config/AppNavigation'

type Props = {};
//  进行一些配置
export default class App extends Component<Props> {
  state = {
    color:null    //  diy主题颜色
  }

  componentWillMount() {
    //  程序初始化时读取缓存中的颜色
    AsyncStorage.getItem('diyColor',(error,res) => {
      if (!error) this.setState({color:res})
    })
  }

  componentDidMount() {
    //  监听修改主题事件
    this.listen = DeviceEventEmitter.addListener('diyColor',res => {
        this.setState({color:res})
    })
  }

  componentWillUnmount(){
    console.log('卸载')
    if(this.listen){
      this.listen.remove();
    }
  }

  render() {
    setTimeout(() => {
      SplashScreen.hide();
    },600)
      return (
        <AppStackNavigaton
            screenProps={this.state.color}
        />
      );
  }
}
