import {StyleSheet} from 'react-native';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {themes} from '../styles/themes';
import { defaultTheme } from "../styles";

const themeKey = 'theme';

export const retrieveTheme = createAsyncThunk('themes/fetch', async () => {
  const themeName = await AsyncStorage.getItem(themeKey);
  if (themeName) {
    const theme = themes.find(i => i?.name === themeName);
    return theme;
  } else {
    return {theme: defaultTheme};
  }
});

export const getStyles = theme => {
  const {primaryColor, textColor} = theme || {};
  const styles = StyleSheet.create({
    primaryBackground: {
      backgroundColor: primaryColor,
      color: textColor,
    },
    primaryText: {
      color: primaryColor,
    },
  });
  return styles;
};

export const themesSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: themes?.[0],
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    saveToStorage: state => {
      if (state.theme) {
        AsyncStorage.setItem(themeKey, state.theme.name);
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(retrieveTheme.fulfilled, (state, action) => {
      state.theme = action.payload;
    });
  },
});

export const {setTheme, saveToStorage} = themesSlice.actions;
