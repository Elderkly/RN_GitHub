import React from 'react';
import {TouchableOpacity} from  'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ViewUtils {
  static getLeftView(callback) {
    return (
      <TouchableOpacity
        style={{padding:8}}
        onPress={() => callback()}
      >
        <Icon name='angle-left' color={'#fff'} size={30} />
      </TouchableOpacity>
    )
  }
}
