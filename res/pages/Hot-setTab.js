
import React, {Component} from 'react';
import {Text, View,StyleSheet,TouchableOpacity,ScrollView} from 'react-native';

import NavigationBar from '../common/js/NavigationBar'
import ViewUtils from '../common/js/ViewUtils'
type Props = {};
export default class App extends Component<Props> {
  loadData() {
    console.log('load')
  }
  render() {
    const {navigation} = this.props
    const _RightButton = <TouchableOpacity
      onPress={() => {
        console.log('save')
      }}
    ><Text style={styles.rightButton}>保存</Text>
    </TouchableOpacity>
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'自定义标签'}
          style={{
            backgroundColor:'rgb(208,39,96)'
          }}
          leftButton={ViewUtils.getLeftView(e => {
            navigation.goBack()
          })}
          rightButton={_RightButton}
        />
        <ScrollView>
          {this.loadData()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rightButton:{
    color:'#fff',
    fontSize:16,
    marginRight: 10
  }
});
