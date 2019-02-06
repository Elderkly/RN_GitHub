import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Linking,
    Alert,
    Modal
} from 'react-native';

import ImageViewer from 'react-native-image-zoom-viewer';


import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';

import {isIphoneX} from '../common/js/util'

import Fetch from "../common/js/HttpRequest";

import ParallaxScrollView from 'react-native-parallax-scroll-view';


class Talks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items:[],
            showModel:false
        }
    }

    componentWillMount() {
        this.getUserData()
    }

    getUserData() {
        const url = 'https://api.github.com/users/Elderkly/repos'
        Fetch.get(url)
            .then(res => {
                res.map(e => {
                    e.id === 164290858 ?
                        this.setState({
                            items:e
                        })
                        : null
                })
                console.log(this.state.items)
            })
    }

    render() {
        const { onScroll = () => {} ,navigation} = this.props;
        const r = this.state.items
        return (
            <ParallaxScrollView
                onScroll={onScroll}

                backgroundColor="rgba(0,0,0,.5)"
                headerBackgroundColor="#333"
                stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
                parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
                backgroundSpeed={10}
                //  background
                renderBackground={() => (
                    <View key="background">
                        <Image source={{uri: 'https://res.allmacwallpaper.com/pic/Thumbnails/18163_728.jpg',
                            width: window.width,
                            height: PARALLAX_HEADER_HEIGHT}}/>
                        <View style={{position: 'absolute',
                            top: 0,
                            width: window.width,
                            backgroundColor: 'rgba(0,0,0,.4)',
                            height: PARALLAX_HEADER_HEIGHT}}/>
                    </View>
                )}
                //  header
                renderForeground={() => (
                    <View key="parallax-header" style={ styles.parallaxHeader }>
                        <TouchableOpacity
                            onPress={() => this.setState({showModel:true})}
                        >
                            <Image
                                style={ styles.avatar }
                                source={{
                                    uri: r.owner ? r.owner.avatar_url : '',
                                    width: AVATAR_SIZE,
                                    height: AVATAR_SIZE
                                }}
                            />
                        </TouchableOpacity>

                        <Modal
                            visible={this.state.showModel}
                            transparent={true}
                        >
                            <ImageViewer
                                imageUrls={[
                                    {
                                        url: r.owner ? r.owner.avatar_url : '',
                                    }
                                ]}
                                enableSwipeDown={true}  //  是否开启下滑关闭
                                onSwipeDown={() => this.setState({showModel: false})}   //  下滑事件
                                onClick={() => this.setState({showModel: false})}   //  点击事件
                                saveToLocalByLongPress={false}  //  是否显示长按菜单
                                swipeDownThreshold={10}     //  下滑关闭距离
                            />
                        </Modal>

                        <Text style={ styles.sectionSpeakerText }>
                            RN-GitHub
                        </Text>
                        <Text style={ styles.sectionTitleText }>
                            一款很酷炫的双平台App
                        </Text>
                    </View>
                )}
                //  leftView
                renderStickyHeader={() => (
                    <View key="sticky-header" style={styles.stickySection}>
                        <Text style={styles.stickySectionText}>YOOOOOOOOOOO</Text>
                    </View>
                )}
                //  rightView
                renderFixedHeader={() => (
                    <View key="fixed-header" style={styles.fixedSection}>
                        <TouchableOpacity style={styles.fixedSectionText}
                                          onPress={() => {navigation.goBack()}}>
                            <FontAwesome name='angle-left' color={'#fff'} size={30} />
                        </TouchableOpacity>
                    </View>
                )}>

                <TouchableOpacity>
                    <View style={styles.itemsBox}>
                        <Text style={{fontSize: 16,marginBottom: 2}}>{r.full_name}</Text>
                        <Text style={{fontSize:14,color:'#b7b7b7',marginBottom:2}}>{r.description}</Text>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                            <View style={{flexDirection:'row',alignItems: 'center'}}>
                                <Text style={{marginRight: 3}}>Author:</Text>
                                <Image
                                    style={{height:22,width:22}}
                                    source={{uri:r.owner ? r.owner.avatar_url : ''}}
                                ></Image>
                            </View>
                            <View style={{flexDirection:'row',alignItems: 'center'}}>
                                <Text>Stars:</Text>
                                <Text>{r.stargazers_count}</Text>
                            </View>
                            <TouchableOpacity>
                                <Icon name={r.isCollect ? 'ios-star' : 'ios-star-outline' } color={'rgb(31,101,255)'} size={24} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.items}
                    onPress={() => {
                        navigation.navigate('Hot_details',{
                            item:{
                                name: "RN_GitHub",
                                html_url: "https://github.com/Elderkly/RN_GitHub",
                                flag_language:true,
                                HiddenCollectIcon:true,
                            }
                        })
                    }}
                >
                    <Icon name='ios-compass' color={'#3381ff'} size={24} />
                    <Text
                        style={styles.itemsText}
                    >项目地址</Text>
                    <Icon name='ios-arrow-forward' color={'#3381ff'} size={24} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.items}
                    onPress={() => {
                        const url = 'mailto://897676943@qq.com'
                        Linking.canOpenURL(url).then(supported => {
                            if (!supported) {
                                Alert.alert('提示','请先安装邮箱客户端')
                            } else {
                                return Linking.openURL(url);
                            }
                        }).catch(err => console.error('An error occurred', err));
                    }}
                >
                    <Icon name='ios-paper-plane' color={'#3381ff'} size={24} />
                    <Text
                        style={styles.itemsText}
                    >联系作者</Text>
                    <Icon name='ios-arrow-forward' color={'#3381ff'} size={24} />
                </TouchableOpacity>
            </ParallaxScrollView>
        );
    }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = isIphoneX() ? 90 : 70;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        margin: 10
    },
    fixedSection: {
        position: 'absolute',
        bottom: 10,
        left: 10
    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 100
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 24,
        paddingVertical: 5
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 18,
        paddingVertical: 5
    },
    row: {
        overflow: 'hidden',
        paddingHorizontal: 10,
        height: ROW_HEIGHT,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    rowText: {
        fontSize: 20
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
    itemsBox:{
        marginVertical: 5,
        borderWidth: 0.5,
        marginHorizontal: 5,
        backgroundColor:'#fff',
        borderRadius:2,
        paddingVertical: 10,
        paddingHorizontal:10,
        shadowColor: '#000',
        shadowOffset:{width:0.5,height:0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation:2,
        borderColor:'#ddd'
    }
});

export default Talks;