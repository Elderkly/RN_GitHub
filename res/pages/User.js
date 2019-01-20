
import React, {Component} from 'react';
import {Text, View,StyleSheet} from 'react-native';

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
                <Text style={styles.text}>Pages 我的</Text>
                <Text
                    style={styles.text}
                    onPress={() => {
                        console.log(navigation)
                        navigation.navigate('Hot_SetTab')
                    }}
                >自定义标签</Text>
                <Text
                    style={styles.text}
                    onPress={() => {
                        navigation.navigate('Hot_sortTab')
                    }}
                >标签排序</Text>
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
    }
});
