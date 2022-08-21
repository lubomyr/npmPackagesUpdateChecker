import React from 'react';
import {useSelector} from 'react-redux';
import {getStyles} from '../store/themesSlice';

export function withTheme(WrappedComponent) {
  return props => {
    const theme = useSelector(state => state?.themes?.theme);
    const themeStyles = getStyles(theme?.theme);
    return (
      <WrappedComponent
        {...props}
        theme={theme?.theme}
        themeStyles={themeStyles}
      />
    );
  };
}
