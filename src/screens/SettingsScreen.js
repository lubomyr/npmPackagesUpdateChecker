import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {FieldWrapper, Dropdown} from '../components';
import {themes} from '../styles/themes';
import {themeStore} from '../observers/themeStore';

const SettingsScreen = props => {
  const {theme, setTheme, saveToStorage} = themeStore;
  const {colors} = useTheme();
  const {primaryColor} = colors;

  useEffect(() => {
    return () => saveToStorage();
  }, []);

  const themeSelector = (
    <FieldWrapper title={'Theme'}>
      <Dropdown
        style={{backgroundColor: primaryColor, ...styles.dropdownStyle}}
        itemStyle={{backgroundColor: primaryColor}}
        textStyle={styles.dropDownText}
        data={themes}
        value={theme}
        onChange={v => setTheme(v)}
      />
    </FieldWrapper>
  );

  return <View style={styles.root}>{themeSelector}</View>;
};
export default observer(SettingsScreen);

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    padding: 30,
  },
  dropdownStyle: {
    borderRadius: 4,
  },
  dropDownText: {
    color: 'white',
  },
});
