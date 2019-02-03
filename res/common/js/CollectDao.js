/*
*  数据收藏处理类
* */
import React from 'react';
import {AsyncStorage} from 'react-native';

export default class CollectionDao {
    //  加工原数据 返回收藏状态
    static initData(key,data,callback) {
        AsyncStorage.getItem(key,(error,ject) => {
            if (error) {
                console.log('获取出错',error)
            } else {
                const json = ject === null ? [] : JSON.parse(ject)
                for (let x in data) {
                    //  由于热门模块和趋势模块数据模型不同 所以需要区分处理
                    data[x].isCollect = key == 'KeyCollect'
                        ? (json.find(e => e.id == data[x].id) ? true : false)
                        : (json.find(e => e.fullName == data[x].fullName) ? true : false)
                }
                callback(data)
            }
        })
    }

    //  修改收藏状态
    static setCollection(isCollect,key,data,callback) {
        AsyncStorage.getItem(key,(error,ject) => {
            if (error) {
                console.log('获取失败')
            } else {
                const Stirage = ject === null ? [] : JSON.parse(ject)
                //  数据已收藏 需要取消收藏
                if (isCollect) {
                    //  获取当前点击数据在缓存中的位置
                    const index = key === 'KeyCollect'
                        ? Stirage.findIndex(e => e.id === data.item.id)
                        : Stirage.findIndex(e => e.fullName === data.item.fullName)
                    //  删除当前点击数据
                    Stirage.splice(index,1)
                    console.log(Stirage)
                } else {  //  反之需要加入收藏
                    data.item.isCollect = true
                    Stirage.push(data.item)
                    console.log(Stirage)
                }
                //  重新写入缓存
                AsyncStorage.setItem(key,JSON.stringify(Stirage),error => {
                    if (!error) {
                       callback(Stirage)
                    }
                })
            }
        })
    }
}