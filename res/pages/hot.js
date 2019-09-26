
import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Linking, Alert} from 'react-native';

import NavigationBar from '../common/js/NavigationBar'

import {MaterialTopTabNavigator,getPagesData} from '../config/MaterialTopTabNavigator'

import Icon from 'react-native-vector-icons/Ionicons';

import MenuDialog from '../common/js/MenuDialog'

/*
   由于HOT页面的TopNavigator有些特殊
   获取的路由是TopNavigator的路由
   无法实现一二级页面的跳转

   所以将hot页面的路由导出用于在MaterialTopTabNavigator.js中进行跳转123213123122222222

*/
export let Homenavigation = null

getPagesData('flag_key')

//  页面主容器
export default class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      menus:[
        {name:'反映',icon:'ios-mail'},
        {name:'关于作者',icon:'ios-contact'},
      ],
      theme:{
        iconColor:'rgb(101,24,244)',
        // content:{
        //   alignItems: 'center',
        // }
      }
    }
  }

  showMenu() {
    this.dialog.show()
  }

  SelectTab(tab) {
    this.dialog.dismiss()
    let [navigation,data] = [null,null]
    switch(tab.name) {
      case '关于作者':
        navigation = 'Hot_details'
        data = {
          item:{
            name: "QZP743",
            html_url: "https://github.com/Elderkly",
            flag_language:true,
            HiddenCollectIcon:true,
        }}
        break
      case '反映':
        break
    }
    if (tab.name === '反映') {
      const url = 'mailto://897676943@qq.com'
      Linking.canOpenURL(url).then(supported => {
        if (!supported) {
          Alert.alert('提示','请先安装邮箱客户端')
        } else {
          return Linking.openURL(url);
        }
      }).catch(err => console.error('An error occurred', err));
      return
    }
    navigation ? Homenavigation.navigate(navigation,data ? data : {}) : null
  }

  renderMenuDialog() {
    return (
      <MenuDialog
        ref={dialog => this.dialog = dialog}
        menus={this.state.menus}
        theme={this.state.theme}
        onSelect={(tab) => this.SelectTab(tab)}
        onClose={() => {
          console.log('close')
        }}
      ></MenuDialog>
    )
  }

  renderRightButton() {
    return (
      <TouchableOpacity
        style={{marginRight:15}}
        onPress={() => this.showMenu()}
      >
        <Icon name='ios-more' color={'#fff'} size={24} />
      </TouchableOpacity>
    )
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
          leftButton={<TouchableOpacity>
            <Icon name='ios-log-out' color={'rgb(101,24,244)'} size={24} />
          </TouchableOpacity>}
          rightButton={this.renderRightButton()}
        />
        <MaterialTopTabNavigator/>
        {this.renderMenuDialog()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
