import React, {Component} from 'react';
import {
    AsyncStorage,
    DeviceEventEmitter,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {Homenavigation} from './hot'

import CollectDao from "../common/js/CollectDao"

export default class CollectionHot extends Component {
    constructor(props){
        super(props)
        this.state = {
            data:'',
            isLoading:true
        }
    }
    //  render之前
    componentWillMount(){
        this.getData()
        this.listen = DeviceEventEmitter.addListener('loadCollection_flag_key',res => {
            console.log('热门收藏更新')
            this.getData()
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.data === '' || this.state.data.length < 1 ?
                        <Text style={styles.nomessage}>暂无数据</Text> :
                        <FlatList
                            data={this.state.data}  //  数据
                            extraData={this.state.data}
                            renderItem={(data) => this.flag_keyLoadRenderDom(data)}  //  渲染模板
                            refreshing={this.state.isLoading} //  是否显示下拉loading
                            onRefresh={() => this.upLoad()} //  下拉刷新事件
                            keyExtractor={(item) => item.node_id } //  items唯一key
                        />
                }
            </View>
        )
    }
    //  下拉刷新
    upLoad() {
        this.getData()
    }
    //  获取数据
    getData() {
        this.flag_keyLoad()
    }
    //  热门页面
    flag_keyLoad() {
        this._initData()
    }
    //  热门 模板
    flag_keyLoadRenderDom(data){
        const r = data.item
        r.Collection = true
        return (
            <TouchableOpacity
                onPress={() => {
                    Homenavigation.navigate('Hot_details',{item:r})
                }}
            >
                <View style={styles.itemsBox}>
                    <Text style={{fontSize: 16,marginBottom: 2}}>{r.full_name}</Text>
                    <Text style={{fontSize:14,color:'#b7b7b7',marginBottom:2}}>{r.description}</Text>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                        <View style={{flexDirection:'row',alignItems: 'center'}}>
                            <Text style={{marginRight: 3}}>Author:</Text>
                            <Image
                                style={{height:22,width:22}}
                                source={{uri:r.owner.avatar_url}}
                            ></Image>
                        </View>
                        <View style={{flexDirection:'row',alignItems: 'center'}}>
                            <Text>Stars:</Text>
                            <Text>{r.stargazers_count}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => this._selectPressItem('KeyCollect',data)}
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

        CollectDao.setCollection(isCollect,key,data,res => {
            DeviceEventEmitter.emit('updateCollection_flag_key')
            this.setState({
                data:res
            })
        })
    }
    //  初始化数组 根据缓存添加是否收藏字段
    _initData() {
        AsyncStorage.getItem('KeyCollect',(error,ject) => {
            if (error) {
                console.log('获取出错',error)
            } else {
                // console.log('获取的缓存数据：',ject)
                this.setState({
                    data:ject === null ? [] : JSON.parse(ject)
                })
                setTimeout(() => {
                    this.setState({
                        isLoading:false
                    })
                },300)
            }
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center'
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
    },
    nomessage:{
        fontSize:20,
        marginTop: 50
    }
});