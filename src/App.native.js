import React, {useEffect} from 'react';
//import {startNetworkLogging} from 'react-native-network-logger';
import Navigation from './Navigation';
import {themeStore} from './observers/themeStore';
import {packagesStore} from './observers/packageStore';

const App = props => {
  const {retrieveFromStorage: retrieveThemeFromStorage} = themeStore;
  const {retrieveFromStorage: retrievePackagesFromStore} = packagesStore;

  useEffect(() => {
    // startNetworkLogging({
    //   ignoredHosts: ['localhost', 'clients3.google.com'],
    // });
    retrieveThemeFromStorage()
      .then()
      .catch(error => console.log(error));
    retrievePackagesFromStore()
      .then()
      .catch(error => console.log(error));
  }, []);

  return <Navigation />;
};
export default App;
