import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Navigation from './Navigation';
import {retrieveTheme} from './store/themesSlice';
import {retrievePackages} from './store/packagesSlice';

const App = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveTheme());
    dispatch(retrievePackages());
  }, []);

  return <Navigation />;
};
export default App;
