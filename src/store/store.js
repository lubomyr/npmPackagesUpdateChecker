import {configureStore} from '@reduxjs/toolkit';
import {themesSlice} from './themesSlice';
import {packagesSlice} from './packagesSlice';

export const store = configureStore({
  reducer: {
    themes: themesSlice.reducer,
    packages: packagesSlice.reducer,
  },
});
