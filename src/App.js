import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import Navigation from './Navigation';
import {themeStore} from './observers/themeStore';
import {packagesStore} from './observers/packageStore';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = props => {
  const {retrieveFromStorage: retrieveThemeFromStorage} = themeStore;
  const {retrieveFromStorage: retrievePackagesFromStore} = packagesStore;

  useEffect(() => {
    retrieveThemeFromStorage();
    retrievePackagesFromStore();
  }, []);

  return <Navigation />;
};
export default App;
