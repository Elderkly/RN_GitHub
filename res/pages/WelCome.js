
import React, {Component} from 'react';
import {Text, View,StyleSheet} from 'react-native';


type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      time: 4
    }
  }
  componentWillMount(){
    const {navigation} = this.props
    this.Interval = setInterval(() => {
      this.setState({
        time: this.state.time - 1
      })
      console.log(this.state.time)
      if (this.state.time == 0) {
        clearInterval(this.Interval)
        navigation.navigate('TabBar')
      }
    },1000)
  }
  componentDidMount(){
    this.setState({
      time: this.state.time - 1
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>欢迎页</Text>
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
