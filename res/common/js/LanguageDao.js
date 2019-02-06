//  返回标签数据
//  区分调用模块
import React from 'react'
import {AsyncStorage} from 'react-native'

//  假数据
import keys from '../data/keys.json'
import langs from '../data/langs.json'

//  key 根据不同的key返回相应数据  flag_key:自定义标签
export var FIAG_LANGUAGE = {flag_language:'flag_language_language',flag_key:'flag_language_key'}

export default class LanguageDao {
  constructor(flag) {
    this.flag = flag
  }
  fetch() {
    return new Promise((resolve,reject) => {
      //  根据不同的标签返回相应的数据
      AsyncStorage.getItem(this.flag,(error,result) => {
        if (error) {  //  获取失败
          reject(error)
        } else {
          // AsyncStorage.removeItem(this.flag)
          if (result && result != 'null') { //  如果已经有缓存
            //  防止JSON解析出错
            try {
              resolve(JSON.parse(result))
            } catch(e) {
              reject(e)
            }
          } else {  //  没有缓存 返回默认数据
            var data = this.flag === FIAG_LANGUAGE.flag_key ? keys : langs
            this.save(data)
            resolve(data)
          }
        }
      })
    })
  }
  save(data,callback) {
    AsyncStorage.setItem(this.flag,JSON.stringify(data), error => {
      callback ? callback(error) : ''
    })
  }
}