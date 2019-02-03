
import React, {Component} from 'react';
import {View, StyleSheet,WebView,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import NavigationBar from '../common/js/NavigationBar'
import ViewUtils from "../common/js/ViewUtils";

import CollectDao from '../common/js/CollectDao'

export default class Details extends Component {
    constructor(props){
        super(props)
        this.state = {
            title:'loading',
            url:'http://www.baidu.com',
            canGoBack:false,
            flag_language:false,
            isCollect:false
        }
    }
    componentDidMount() {
        const items = this.props.navigation.state.params.item
        this.setState({
            item:items,
            title: items.name,
            url: items.html_url,
            flag_language: !!items.flag_language,
            Collection:!!items.Collection,
            itemsData:items.itemsData,
            isCollect:items.itemsData ? items.itemsData.isCollect : items.isCollect
        })
    }
    onNavigationStateChange(e) {
        this.setState({
            canGoBack: e.canGoBack,
        })
    }
    renderRightButton() {
        return (
            <TouchableOpacity
                style={{marginRight: 10}}
                onPress={() => {
                    const data = this.state.itemsData ? this.state.itemsData : this.state.item
                    const key = this.state.flag_language ? 'languageCollect' : 'KeyCollect'
                    CollectDao.setCollection(this.state.isCollect,key,{item:data},res => {
                        this.setState({
                            isCollect:!this.state.isCollect
                        })
                    })
                }}
            >
                <Icon name={ this.state.isCollect ? 'ios-star' : 'ios-star-outline' } color={'rgb(255,255,255)'} size={24} />
            </TouchableOpacity>
        )
    }
    render() {
        const {navigation} = this.props
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.state.title}
                    style={{
                        backgroundColor: this.state.Collection ? 'rgb(0,109,106)'
                            : (this.state.flag_language ? 'rgb(31,101,255)' : 'rgb(101,24,244)')
                    }}
                    leftButton={ViewUtils.getLeftView(() => {
                        if (this.state.canGoBack) {
                            this.webView.goBack()
                        }else {
                            navigation.goBack()
                        }
                    })}
                    rightButton={this.renderRightButton()}
                />
                <WebView
                    ref={webView => this.webView = webView}
                    source={{uri:this.state.url}}
                    startInLoadingState={true}
                    onNavigationStateChange={e=>this.onNavigationStateChange(e)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button:{
        fontSize: 20,
        margin: 5
    }
});
