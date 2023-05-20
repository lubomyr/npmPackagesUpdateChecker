import {AppRegistry, Platform} from 'react-native';
import App from './src/App';
import {name} from './app.json';

const appName = Platform.OS === 'macos' ? name.toLowerCase() : name;
AppRegistry.registerComponent(appName, () => App);
