
import React, {Component} from 'react';
import {Text, View,StyleSheet} from 'react-native';

import NavigationBar from '../common/js/NavigationBar'

type Props = {};
export default class App extends Component<Props> {
  render() {
    const {navigation} = this.props
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'我的'}
          style={{
            backgroundColor:'rgb(208,39,96)'
          }}
        />
        <Text>我的</Text>
        <Text
          onPress={() => {
            navigation.navigate('Hot_SetTab')
          }}
        >自定义标签</Text>
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
