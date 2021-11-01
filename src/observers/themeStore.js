import {StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {observable, action} from 'mobx';
import {defaultTheme} from '../styles';

const themeKey = 'theme';

export const themeStore = observable({
  theme: null,
  setTheme: action(value => {
    themeStore.theme = value;
  }),
  getTheme: () => ({...defaultTheme, ...themeStore.theme?.theme}),
  getStyles: () => {
    const theme = themeStore.getTheme();
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
  },
  saveToStorage: () => {
    if (themeStore.theme) {
      AsyncStorage.setItem(themeKey, JSON.stringify(themeStore.theme));
    }
  },
  retrieveFromStorage: async () => {
    const data = await AsyncStorage.getItem(themeKey);
    if (data) {
      themeStore.setTheme(JSON.parse(data));
    }
  },
});
