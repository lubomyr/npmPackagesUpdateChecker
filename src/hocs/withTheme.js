import React from 'react';
import {observer} from 'mobx-react-lite';
import {themeStore} from '../observers/themeStore';

export function withTheme(WrappedComponent) {
  return observer(props => {
    const {getTheme, getStyles} = themeStore;
    const theme = getTheme();
    const themeStyles = getStyles();
    return theme && themeStyles ? (
      <WrappedComponent {...props} theme={theme} themeStyles={themeStyles} />
    ) : null;
  });
}
