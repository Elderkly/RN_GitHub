
import React, {Component} from 'react';
import {Text, View,StyleSheet} from 'react-native';

import NavigationBar from '../common/js/NavigationBar'

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'趋势'}
          style={{
            backgroundColor:'rgb(31,101,255)'
          }}
        />
        <Text style={styles.welcome}>趋势</Text>
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
