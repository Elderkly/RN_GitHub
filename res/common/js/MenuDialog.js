
import React, {Component} from 'react';
import {TouchableOpacity,Modal,StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types'
import {isIphoneX} from './util'

import Icon from 'react-native-vector-icons/Ionicons';
import Font from 'react-native-vector-icons/FontAwesome';


export default class MenuDialog extends Component {
    state = {
        visible:false, //  是否显示
    }

    show() {
        this.setState({
            visible:true
        })
    }

    dismiss() {
        this.setState({
            visible:false
        })
    }

    render() {
        const {onClose,menus,onSelect,theme} = this.props
        return (
            <Modal
                transparent={true}
                visible={this.state.visible}
                onRequestClose={() => onClose()}
            >
                <TouchableOpacity
                    style={[styles.container,theme.content]}
                    onPress={() => this.dismiss()}
                >
                    <Font name='caret-up' color={'#fff'} size={24} style={styles.arrowUp}/>
                    <View
                        style={styles.content}
                    >
                        {menus.map((result,i,arr) => {
                            let menu = arr[i]
                            return <TouchableOpacity
                                key={i}
                                onPress={() => {
                                    onSelect(arr[i])
                                }}
                                underlayColor={'transparent'}
                            >
                                <View
                                    style={{alignItems:'center',flexDirection:'row'}}
                                >
                                    <Icon 
                                        name={menu.icon} 
                                        color={theme.iconColor} 
                                        size={24}
                                        style={styles.icon}
                                    />
                                    <Text
                                        style={styles.text}
                                    >{menu.name}</Text>
                                    {
                                        i !== menu.length - 1 ? <View style={styles.line}/> : null
                                    }
                                </View>
                            </TouchableOpacity>
                        })}
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }
}

MenuDialog.propTypes = {
    menus:PropTypes.array.isRequired,   //  显示内容
    onSelect:PropTypes.func.isRequired, //  点击事件
    theme:PropTypes.object,    //   自定义主题
    onClose:PropTypes.func      //   弹窗关闭回调
}
MenuDialog.defaultProps = {
    menus:[],
    theme:{
        iconColor:'#000'
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgba(0,0,0,.5)',
        alignItems:'flex-end'
    },
    arrowUp:{
        marginTop:56 + (isIphoneX() ? 10 : 0),
        marginRight: 18
    },
    text:{
        fontSize:16,
        fontWeight: '400',
        color:'black',
        paddingRight: 15,
    },
    line:{
        height:0.3,
        backgroundColor:'darkgray'
    },
    content:{
        backgroundColor:'white',
        borderRadius: 3,
        paddingTop: 3,
        paddingBottom: 3,
        marginRight:3,
        marginTop:-7
    },
    icon:{
        margin:10,
        marginLeft: 15,
    }
})