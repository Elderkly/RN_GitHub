import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text, View,StyleSheet,StatusBar,FlatList,Image,ActivityIndicator,TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator,createAppContainer} from 'react-navigation'

import {Homenavigation} from '../pages/hot'

import Fetch from "../common/js/HttpRequest";
import LanguageDao,{FIAG_LANGUAGE} from '../common/js/LanguageDao'

//  动态生成TopTabNavigator模板
const newSeen = (_type) => {
  return class TopTabNavigatorView extends Component {
    constructor(props){
      super(props)
      this.state = {
        data:'',
        page:1, //  当前页数
        per_page:15,  //  一次获取记录条数
        loadIndex:1,  //  上拉次数
        isLoading:true, //  显示下拉loading
        ShowDownDom:false,  //  显示上拉dom
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
            renderItem={(data) => this._renderDom(data)}  //  渲染模板
            refreshing={this.state.isLoading} //  是否显示下拉loading
            onRefresh={() => this.upLoad()} //  下拉刷新事件
            ListFooterComponent={() => this._downDom()} //  上拉加载模板
            onEndReached={() => this.downLoad()}  //  上拉加载事件
            onEndReachedThreshold={0} //  触发上拉加载距离
            keyExtractor={(item) => item.node_id} //  items唯一key
          />
        </View>
      )
    }
    //  下拉刷新
    upLoad() {
      this.setState({
        page:1,
        per_page:15,
        loadIndex: 1,
        isLoading:true
      })
      this.getData()
    }
    //  上拉加载
    downLoad() {
      //  GitHub数据一页最多取100条
      if (this.state.per_page * this.state.loadIndex > 100) {
        //  如果达到100条页数+1
        this.setState({
          page: this.state.page += 1,
          per_page: 15,
          loadIndex: 1
        })
      } else {  //  否则增加上拉次数 计算获取条数
        this.setState({
          loadIndex: this.state.loadIndex += 1,
        })
      }
      this.getData('down')
    }
    //  上拉加载Dom
    _downDom() {
      const opacity = this.state.ShowDownDom ? 1 : 0
      return (
        <View style={{marginVertical: 10,alignItems:'center',opacity:opacity}}>
          <ActivityIndicator color={'rgb(101,24,244)'}></ActivityIndicator>
          <Text>Loading</Text>
        </View>
      )
    }
    //  获取数据
    getData(type) {
      /*
        page 页数
        per_page 数据条数 最多100
      */
      const url = `https://api.github.com/search/repositories?q=${_type}&page=${this.state.page}&per_page=${this.state.per_page * this.state.loadIndex}&sort=stars`
      // console.log(url)
      Fetch.get(url)
        .then( res => {
          //  如果翻页了需要将数据push到原数组后见面 否则的话直接覆盖原数组就行
          let newJson
          if (type == 'down' && this.state.per_page * this.state.loadIndex > 100) {
            newJson = this.state.data
            res.items.map(e => {
              newJson.push(e)
            })
          }
          this.setState({
            data:type == 'down' && this.state.per_page * this.state.loadIndex > 100 ? newJson : res.items,
            ShowDownDom:true
          })
          setTimeout(() => {
            this.setState({
              isLoading:false
            })
          },300)
        })
        .catch(error => {
          console.log('error:',error)
        })
    }

    //  list 模板
    _renderDom(data){
      const r = data.item

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
              <Icon name='ios-star-outline' color={'rgb(101,24,244)'} size={24} />
            </View>
          </View>
        </TouchableOpacity>
      )
    }
  }
}

export let MaterialTopTabNavigator

const getPagesData = () => {
  const _LanguageDao = new LanguageDao(FIAG_LANGUAGE.flag_key)
  _LanguageDao.fetch()
    .then(result => {
      let USER_TAB_DATA = {}
      for (let i in result) {
        const d = result[i]
        if (d.checked) {
          USER_TAB_DATA[i] = {
            screen: newSeen(d.path),
            navigationOptions: {
              tabBarLabel: d.name
            }
          }
        }
      }
      const TabNavigatorConfig ={
        lazy:true,  //  懒加载
        tabBarOptions: {
          tabStyle: {
            width:120,
          },
          upperCaseLabel: false,//是否使标签大写，默认为true
          scrollEnabled: true ,//是否支持 选项卡滚动，默认false
          style: {
            backgroundColor: 'rgb(101,24,244)',//TabBar 的背景颜色
          },
          indicatorStyle: {
            height: 2,
            backgroundColor: 'white',
          },//标签指示器的样式
          labelStyle: {
            fontSize: 13,
            marginTop: 6,
            marginBottom: 6,
          },//文字的样式
        }
      }
      MaterialTopTabNavigator = createAppContainer(createMaterialTopTabNavigator(USER_TAB_DATA,TabNavigatorConfig))
      // console.log(USER_TAB_DATA)
    })
    .catch(error => {
      console.log(error)
    })
}

getPagesData()

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