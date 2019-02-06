import React, {Component} from 'react';
import {AsyncStorage, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {Homenavigation} from './hot'

import CollectDao from "../common/js/CollectDao"

export default class CollectionTrend extends Component {
    constructor(props){
        super(props)
        this.state = {
            data:'',
            isLoading:true, //  显示下拉loading
        }
    }
    //  render之前
    componentWillMount(){
        this.getData()
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.data}  //  数据
                    extraData={this.state.data}
                    renderItem={(data) => this.flag_languageLoadRenderDom(data)}  //  渲染模板
                    refreshing={this.state.isLoading} //  是否显示下拉loading
                    onRefresh={() => this.upLoad()} //  下拉刷新事件
                    keyExtractor={(item) => item.url} //  items唯一key
                />
            </View>
        )
    }
    //  下拉刷新
    upLoad() {
        this.getData()
    }
    //  获取数据
    getData() {
        this.flag_languageLoad()
    }
    //  趋势页面
    flag_languageLoad(){
        this._initData('languageCollect')
        setTimeout(() => {
            this.setState({
                isLoading:false
            })
        },300)
    }
    //  趋势 模板
    flag_languageLoadRenderDom(data){
        const r = data.item
        const item = {
            name: r.fullName,
            html_url: 'https://github.com/' + r.url,
            flag_language:true,
            Collection:true,
            itemsData: r
        }
        return (
            <TouchableOpacity
                onPress={() => {
                    Homenavigation.navigate('Hot_details',{item:item})
                }}
            >
                <View style={styles.itemsBox}>
                    <Text style={{fontSize: 16,marginBottom: 2}}>{r.fullName}</Text>
                    <Text style={{fontSize:14,color:'#b7b7b7',marginBottom:2}}>{r.description}</Text>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                        <View style={{flexDirection:'row',alignItems: 'center'}}>
                            <Text style={{marginRight: 3}}>Bulid by:</Text>
                            <Image
                                style={{height:22,width:22}}
                                source={{uri:r.contributors[0]}}
                            ></Image>
                        </View>
                        <View style={{flexDirection:'row',alignItems: 'center'}}>
                            <Text>Stars:</Text>
                            <Text>{r.starCount}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => this._selectPressItem('languageCollect',data)}
                        >
                            <Icon name={r.isCollect ? 'ios-star' : 'ios-star-outline' } color={'rgb(31,101,255)'} size={24} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    //  单击收藏按钮
    _selectPressItem(key,data) {
        //  获取当前点击数据收藏状态
        const isCollect = data.item.isCollect
        //  获取已收藏的数据
        CollectDao.setCollection(isCollect,key,data,res => {
            this.setState({
                data:res
            })
        })
    }
    //  初始化数组 根据缓存添加是否收藏字段
    _initData() {
        AsyncStorage.getItem('languageCollect',(error,ject) => {
            if (error) {
                console.log('获取出错',error)
            } else {
                this.setState({
                    data:ject === null ? [] : JSON.parse(ject)
                })
                console.log(ject)
            }
        })
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemsBox:{
        marginVertical: 5,
        borderWidth: 0.5,
        marginHorizontal: 10,
        backgroundColor:'#fff',
        borderRadius:2,
        paddingVertical: 5,
        paddingHorizontal:10,
        shadowColor: '#000',
        shadowOffset:{width:0.5,height:0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation:2,
        borderColor:'#ddd'
    }
});