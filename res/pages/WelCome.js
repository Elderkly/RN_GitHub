
import React, {Component} from 'react';
import {Text, View,StyleSheet} from 'react-native';
import NavigationBar from '../common/js/NavigationBar'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 3
    }
  }
  componentDidMount(){
    const {navigation} = this.props
    setTimeout(() => {
      this.Interval = setInterval(() => {
        this.setState({
          time: this.state.time - 1
        })
        if (this.state.time == 0) {
          clearInterval(this.Interval)
          navigation.navigate('TabBar')
        }
      },1000)
    },300)
  }
  render() {
    return (
        <View style={styles.container}>
          <NavigationBar/>
          <Text style={styles.welcome}>这是一条广告</Text>
          <Text style={{fontSize: 60}}>{this.state.time}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
