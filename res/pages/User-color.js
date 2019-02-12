
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Modal,
    ScrollView,
    TouchableHighlight,
    Text,
    Platform,
    AsyncStorage,
    DeviceEventEmitter
} from 'react-native';

import {ThemeFlags} from '../common/js/ThrmrFatory'
import {isIphoneX} from '../common/js/util'

export default class Color extends Component {
    getColorView(text) {
        return(
            <TouchableHighlight
                style={{flex:1}}
                onPress={() => {
                    AsyncStorage.setItem('diyColor',ThemeFlags[text],error => {
                        if (!error) {
                            //  发送修改主题事件修改底部tabBar颜色
                            DeviceEventEmitter.emit('diyColor',ThemeFlags[text])
                        }
                    })
                    this.props.onClose(ThemeFlags[text])
                }}
            >
                <View
                    style={[{backgroundColor:ThemeFlags[text]},styles.items]}
                >
                    <Text
                        style={styles.text}
                    >{text}</Text>
                </View>
            </TouchableHighlight>
        )
    }
    renderThemItyems() {
        let view = []
        const json = Object.keys(ThemeFlags)
        for (let i = 0;i<json.length;i+=3) {
            view.push(
                <View
                    key={i}
                    style={styles.itemsBox}
                >
                    {this.getColorView(json[i])}
                    {this.getColorView(json[i + 1])}
                    {this.getColorView(json[i + 2])}
                </View>
            )
        }
        return view
    }

    renderContentView() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => this.props.onClose()}
            >
                <View
                    style={styles.modalContainer}
                >
                    <ScrollView>
                        {this.renderThemItyems()}
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    render() {
        let view = this.props.visible ?  <View style={styles.container}>
            {this.renderContentView()}
        </View> : null
        return view;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalContainer: {
        flex:1,
        margin:10,
        marginTop:Platform.OS==='ios' ? (isIphoneX() ? 40 : 20 ) : 10,
        backgroundColor:'white',
        borderRadius:3,
        shadowColor:'gray',
        shadowOffset:{width:5,height:5},
        shadowOpacity:0.5,
        shadowRadius:2,
        padding:3
    },
    itemsBox:{
        flexDirection: 'row'
    },
    items:{
        flex: 1,
        height:120,
        margin: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text:{
        color:'#fff',
        fontSize:16,
        fontWeight: '500'
    }
});
