/**
 * @format
 */
import React from 'react';
import {AppRegistry, Platform} from 'react-native';
import {Provider} from 'react-redux';
import App from './src/App';
import {name} from './app.json';
import {store} from './src/store/store';

const app = props => (
  <Provider store={store}>
    <App />
  </Provider>
);

const appName = Platform.OS === 'macos' ? name.toLowerCase() : name;
AppRegistry.registerComponent(appName, () => app);
