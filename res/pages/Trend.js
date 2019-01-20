
import React, {Component} from 'react';
import {Text, View,StyleSheet,TextInput,AsyncStorage} from 'react-native';

import NavigationBar from '../common/js/NavigationBar'
import Toast, {DURATION} from 'react-native-easy-toast'

const KEY = 'text'

import LanguageDao , {FIAG_LANGUAGE} from '../common/js/LanguageDao'

type Props = {};
export default class App extends Component<Props> {
  componentDidMount() {
    this.languageDao = new LanguageDao(FIAG_LANGUAGE.flag_key)
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
        <TextInput
          style={{borderWidth: 1,height: 50,fontSize:16,width: 200,margin: 6}}
          onChangeText={text=>this.text = text}
        />
        <View style={{flexDirection: 'row'}}>
          <Text
            style={styles.button}
            onPress={() => this._removeStorage()}
          > 初始化缓存</Text>
        </View>
        <Toast ref="toast"/>
      </View>
    );
  }

  _setStorage() {
    AsyncStorage.setItem(KEY,this.text, (error) => {
      if (!error) {
        this.refs.toast.show('保存成功')
      } else {
        this.refs.toast.show('保存失败')
      }
    })
  }

  _removeStorage () {
    this.languageDao.init()
    // AsyncStorage.removeItem(KEY,(error) => {
    //   if (!error) {
    //     this.refs.toast.show('移除成功')
    //   } else {
    //     this.refs.toast.show('移除失败')
    //   }
    // })
  }

  _getStorage() {
    AsyncStorage.getItem(KEY,(error,result) => {
      if (!error) {
        result ? this.refs.toast.show('取出的内容： '+ result) : this.refs.toast.show('没有数据')
      } else {
        this.refs.toast.show('获取失败')
      }
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button:{
    fontSize: 20,
    margin: 5
  }
});
