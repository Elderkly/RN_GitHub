import React, { Component } from 'react'
import { Text, View , StyleSheet , TouchableHighlight , TouchableOpacity , Alert} from 'react-native'

import NavigationBar from '../common/js/NavigationBar'
import Icon from 'react-native-vector-icons/Ionicons';

import LanguageDao, {FIAG_LANGUAGE} from '../common/js/LanguageDao'
import SortableListView  from 'react-native-sortable-listview'
import ViewUtils from '../common/js/ViewUtils'
import ArrayUtil from '../common/js/ArrayUtil'

export default class HotsortTab extends Component {
    constructor(props) {
        super(props)
        this.dataArray = []       //    数据库中的所有数组
        this.sortResultArray = []   //  重新排序后生成的数组
        this.orginalCheckedArray = []   //  上一次排序的数组
        this.state = {
            checkedArray: []        //  用户订阅的标签数组
        }
    }

    componentDidMount() {
        this.languageDao = new LanguageDao(FIAG_LANGUAGE.flag_key)
        this.loadData()
    }

    loadData() {
        this.languageDao.fetch()
            .then(result => {
                this.getCheckItems(result)
            })
            .catch(error => {

            })
    }

    getCheckItems(result) {
        this.dataArray = result
        let checkedArray = []
        for (let x in result) {
            let data = result[x]
            if (data.checked) checkedArray.push(data)
        }
        this.setState({
            checkedArray:checkedArray
        })
        this.orginalCheckedArray = JSON.parse(JSON.stringify(checkedArray))
    }
    
    render() {
        const {navigation} = this.props
        const rightButton = <TouchableOpacity
            onPress={e => {
                const isEqual = ArrayUtil.isEqual(this.orginalCheckedArray,this.state.checkedArray)
                if (!isEqual) {
                    Alert.alert(
                        '提示',
                        '确定保存吗',
                        [
                          {text: 'Cancel'},
                          {text: 'OK', onPress: () => {
                              console.log('OK')
                            // this.LanguageDao.save(this.state.data , error => {
                            //   if (!error) {
                            //     this.refs.toast.show('保存成功')
                            //     setTimeout(() => {
                            //       this.props.navigation.goBack()
                            //     },1500)
                            //   } else {
                            //     this.refs.toast.show('保存失败')
                            //   }
                            // })
                          }},
                        ],
                        { cancelable: false }
                      )
                }
            }}
        >
            <Text style={{marginRight:10,fontSize:16,color:'#fff'}}>Save</Text>
        </TouchableOpacity>
        return (
        <View style={{flex:1,backgroundColor:'#eee'}}>
            <NavigationBar
                title={'Sort Key'}
                style={{
                    backgroundColor:'rgb(208,39,96)'
                  }}
                  leftButton={ViewUtils.getLeftView(e => navigation.goBack())}
                  rightButton={rightButton}
            />
            <SortableListView
                style={{flex:1}}
                data={this.state.checkedArray}
                order={Object.keys(this.state.checkedArray)}
                onRowMoved={e => {
                    this.state.checkedArray.splice(e.to,0,this.state.checkedArray.splice(e.from,1)[0])
                    this.forceUpdate()
                }}
                renderRow={row => <SortCell data={row}></SortCell>}
            ></SortableListView>
        </View>
        )
    }
}

class SortCell extends Component {
    render() {
        return (
            <TouchableHighlight      
                {...this.props.sortHandlers}
                underlayColor={'#eee'}
            >
                <View style={styles.items}>
                    <Icon
                        size={24}
                        color={'#2196F3'}
                        name={"ios-folder"}
                    ></Icon>
                    <Text style={{marginLeft:10}}>{this.props.data.name}</Text>
                </View>
            </TouchableHighlight >
        ) 
    }
}


const styles = StyleSheet.create({
    items:{
        flexDirection:'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor:'#fff',
        height:50,
        justifyContent: 'flex-start',
    }
});