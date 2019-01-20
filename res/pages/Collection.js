
import React, {Component} from 'react';
import {Text, View, StyleSheet, WebView,TextInput} from 'react-native';

import NavigationBar from '../common/js/NavigationBar'

import Toast from 'react-native-easy-toast'

const URL = 'http://www.baidu.com'

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      url: URL,
      canGoBack:false
    }
  }
  onNavigationStateChange(e) {
    this.setState({
      canGoBack: e.canGoBack,
      title:e.title
    })
  }
  goBack() {
    if (this.state.canGoBack) {
      this.webView.goBack()
    }else {
      this.refs.toast.show('已经到底了')
    }
  }
  go() {
    this.setState({
      url:this.text
    })
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
        <View style={{flexDirection: 'row',alignItems: 'center',margin:10}}>
          <Text
            style={{fontSize: 24}}
            onPress={() => this.goBack()}
          >返回</Text>
          <TextInput
            style={{height:40,flex:1,borderWidth: 1,marginHorizontal: 10}}
            defaultValue={this.state.url}
            onChangeText={text=>this.text=text}
          />
          <Text
            onPress={() => this.go()}
          >GO</Text>
        </View>
        <WebView
          ref={webView => this.webView = webView}
          source={{uri:this.state.url}}
          onNavigationStateChange={e=>this.onNavigationStateChange(e)}
        />
        <Toast ref="toast"/>
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
