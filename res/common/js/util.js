import {Dimensions, Platform} from "react-native";

/*
* 判断是否是IphoneX 
* */
export function isIphoneX() {
    const X_WIDTH = 375;
    const X_HEIGHT = 812;

    const screenW = Dimensions.get('window').width;
    const screenH = Dimensions.get('window').height;

    return (
        Platform.OS === 'ios' &&
        ((screenH === X_HEIGHT && screenW === X_WIDTH) ||
            (screenH === X_WIDTH && screenW === X_HEIGHT))
    )
}