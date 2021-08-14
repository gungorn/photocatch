import { AppRegistry, Platform, UIManager } from 'react-native';
import { App } from '~/App';

global.startTime = new Date().getTime();
global.getLaunchTime = () => (new Date().getTime() - global.startTime) / 1000;

if (Platform.OS === 'android') UIManager.setLayoutAnimationEnabledExperimental(true);


AppRegistry.registerComponent('photocatch', () => App);
