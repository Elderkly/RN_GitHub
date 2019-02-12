/** @format */

import {AppRegistry} from 'react-native';
import setUp from './res/pages/setup'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => setUp);
