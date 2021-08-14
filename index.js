import { AppRegistry } from 'react-native';
import { App } from '~/App';

global.startTime = new Date().getTime();
global.getLaunchTime = () => (new Date().getTime() - global.startTime) / 1000;

AppRegistry.registerComponent('photocatch', () => App);
