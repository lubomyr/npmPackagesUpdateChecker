import React, {useEffect} from 'react';
import Navigation from './Navigation';
import {themeStore} from './observers/themeStore';
import {packagesStore} from './observers/packageStore';

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
