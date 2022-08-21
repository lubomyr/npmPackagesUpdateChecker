import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {useDispatch} from 'react-redux';
import Navigation from './Navigation';
import {retrieveTheme} from './store/themesSlice';
import {retrievePackages} from './store/packagesSlice';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveTheme());
    dispatch(retrievePackages());
  }, []);

  return <Navigation />;
};
export default App;
