
import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, SectionList, ScrollView, Linking, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import NavigationBar from '../common/js/NavigationBar'

export default class App extends Component {
    render() {
        const {navigation} = this.props
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'我的'}
                    style={{
                        backgroundColor:'rgb(208,39,96)'
                    }}
                />
                <ScrollView>
                    <TouchableOpacity
                        style={styles.items}
                        onPress={() => navigation.navigate('User_about')}
                    >
                        <Icon name='ios-compass' color={'rgb(208,39,96)'} size={40} />
                        <Text
                            style={styles.itemsText}
                        >项目简介</Text>
                        <Icon name='ios-arrow-forward' color={'rgb(208,39,96)'} size={24} />
                    </TouchableOpacity>
                    <SectionList
                        sections={[
                            {
                                title:'编辑标签',
                                data:[
                                    {icon:'ios-build',text:'自定义标签',url:'Hot_SetTab'},
                                    {icon:'ios-repeat',text:'标签排序',url:'Hot_sortTab'},
                                ]
                            },
                            {
                                title:'其他功能',
                                data:[
                                    {icon:'ios-shirt',text:'切换主题',url:''},
                                    {icon:'ios-person',text:'关于作者',url:'Hot_details',data:{
                                            item:{
                                                name: "QZP743",
                                                html_url: "https://github.com/Elderkly",
                                                flag_language:true,
                                                HiddenCollectIcon:true,
                                            }}
                                    },
                                    {icon:'ios-paper-plane',text:'联系我们',url:null},
                                ]
                            }
                        ]}
                        renderItem={({ item, index, section }) => (
                            <TouchableOpacity
                                style={styles.items}
                                onPress={() => {
                                    if (item.url) navigation.navigate(item.url,item.data ? item.data : null)
                                    else if (item.url === null) {
                                        const url = 'mailto://897676943@qq.com'
                                        Linking.canOpenURL(url).then(supported => {
                                            if (!supported) {
                                                Alert.alert('提示','请先安装邮箱客户端')
                                            } else {
                                                return Linking.openURL(url);
                                            }
                                        }).catch(err => console.error('An error occurred', err));
                                    }
                                }}
                            >
                                <Icon name={item.icon} color={'rgb(208,39,96)'} size={24} />
                                <Text
                                    key={index}
                                    style={styles.itemsText}
                                >{item.text}</Text>
                                <Icon name='ios-arrow-forward' color={'rgb(208,39,96)'} size={24} />
                            </TouchableOpacity>
                        )}
                        renderSectionHeader={({ section: { title } }) => (
                            <Text style={styles.header}>{title}</Text>
                        )}
                        ItemSeparatorComponent={() => <View style={{height:1,backgroundColor:'#dfdfdf'}}/>}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    text:{
        fontSize:24,
        marginVertical: 10,
    },
    items:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 20
    },
    itemsText:{
        flex:1,
        marginLeft: 10,
        fontSize:16
    },
    header:{
        backgroundColor:'#eee',
        fontSize:14,
        paddingLeft: 15,
        justifyContent: 'center',
        paddingVertical: 8
    }
});
