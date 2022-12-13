import React, {useEffect} from 'react';
import {startNetworkLogging} from 'react-native-network-logger';
import {useDispatch} from 'react-redux';
import Navigation from './Navigation';
import {retrieveTheme} from './store/themesSlice';
import {retrievePackages} from './store/packagesSlice';

const App = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    startNetworkLogging({
      ignoredHosts: ['localhost', 'clients3.google.com'],
    });
    dispatch(retrieveTheme());
    dispatch(retrievePackages());
  }, []);

  return <Navigation />;
};
export default App;
