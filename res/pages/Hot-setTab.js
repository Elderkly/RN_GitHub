
import React, {Component} from 'react';
import {Text, View,StyleSheet,TouchableOpacity,ScrollView,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import ViewUtils from '../common/js/ViewUtils'
import NavigationBar from '../common/js/NavigationBar'
import LanguageDao,{FIAG_LANGUAGE} from '../common/js/LanguageDao'
import Toast, {DURATION} from 'react-native-easy-toast'

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.LanguageDao = new LanguageDao(FIAG_LANGUAGE.flag_key)
    this.state = {
      data:[],
      setData:false //  是否有修改
    }
  }
  componentDidMount() {
    this.getAsyncStorage()
  }

  getAsyncStorage() {
    this.LanguageDao.fetch()
      .then(result => {
        console.log(result)
        this.setState({
          data:result
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  clickCheckBox(index) {
    console.log(index)
    const item = this.state.data
    item[index].checked = !this.state.data[index].checked
    this.setState({
      data: item,
      setData:true
    })
    console.log(this.state.data)
  }

  loadData() {
    if (this.state.data.length < 1) return
    let _json = []
    for (let i = 0,l = this.state.data.length - 2; i < l; i += 2){
      _json.push(
        <View key={i} style={styles.itemBox}>
          {this.renderCheckBox(i)}
          {this.renderCheckBox(i + 1)}
        </View>
      )
    }
    _json.push(
      <View key={this.state.data.length  - 1} style={styles.itemBox}>
        {this.state.data.length % 2 == 0 ? this.renderCheckBox(this.state.data.length - 2) : null}
        {this.renderCheckBox(this.state.data.length - 1)}
      </View>
    )
    return _json
  }
  renderCheckBox(index) {
    const data = this.state.data
    return (
      <TouchableOpacity
        style={styles.clickBox}
        onPress ={() => this.clickCheckBox(index)}
      >
        <View style={styles.item}>
          <Text>{data[index].name}</Text>
          <Icon
            size={30}
            color={'rgb(208,39,96)'}
            name={data[index].checked ? "ios-radio-button-on" : "ios-radio-button-off"}
          />
        </View>
      </TouchableOpacity>
    )
  }

  saveData() {
    Alert.alert(
      '提示',
      '确定保存吗',
      [
        {text: 'Cancel'},
        {text: 'OK', onPress: () => {
          this.LanguageDao.save(this.state.data , error => {
            if (!error) {
              this.refs.toast.show('保存成功')
              setTimeout(() => {
                this.props.navigation.goBack()
              },1500)
            } else {
              this.refs.toast.show('保存失败')
            }
          })
        }},
      ],
      { cancelable: false }
    )
  }

  render() {
    const {navigation} = this.props
    const _RightButton = <TouchableOpacity
      onPress={() => this.saveData()}
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
            if (this.state.setData) {
              Alert.alert(
                '提示',
                '要放弃修改吗',
                [
                  {text: 'Cancel'},
                  {text: 'OK', onPress: () => navigation.goBack()},
                ],
                { cancelable: false }
              )
            } else {
              navigation.goBack()
            }
          })}
          rightButton={_RightButton}
        />
        <ScrollView>
          {this.loadData()}
        </ScrollView>
        <Toast ref="toast"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8
  },
  rightButton:{
    color:'#fff',
    fontSize:16,
    marginRight: 10
  },
  itemBox:{
    flexDirection: 'row',
    borderBottomWidth:1,
    alignItems: 'center'
  },
  clickBox:{
    flex:1
  }
});
