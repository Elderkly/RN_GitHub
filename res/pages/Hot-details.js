
import React, {Component} from 'react';
import {Text, View, StyleSheet,WebView,  ActivityIndicator} from 'react-native';

import NavigationBar from '../common/js/NavigationBar'
import ViewUtils from "../common/js/ViewUtils";

type Props = {};
export default class Details extends Component<Props> {
    constructor(props){
        super(props)
        this.state = {
            title:'loading',
            url:'http://www.baidu.com',
            canGoBack:false
        }
    }
    componentDidMount() {
        const items = this.props.navigation.state.params.item
        this.setState({
            title: items.name,
            url: items.html_url
        })
    }
    onNavigationStateChange(e) {
        this.setState({
            canGoBack: e.canGoBack,
        })
    }
    render() {
        const {navigation} = this.props
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.state.title}
                    style={{
                        backgroundColor:'rgb(101,24,244)'
                    }}
                    leftButton={ViewUtils.getLeftView(() => {
                        if (this.state.canGoBack) {
                            this.webView.goBack()
                        }else {
                            navigation.goBack()
                        }
                    })}
                />
                <WebView
                    ref={webView => this.webView = webView}
                    source={{uri:this.state.url}}
                    startInLoadingState={true}
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
