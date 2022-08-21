import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {FieldWrapper, Dropdown} from '../components';
import {themes} from '../styles/themes';
import {useSelector, useDispatch} from 'react-redux';
import {setTheme, saveToStorage} from '../store/themesSlice';

const SettingsScreen = props => {
  const theme = useSelector(state => state?.themes?.theme);
  const dispatch = useDispatch();
  const {primaryColor} = theme?.theme || {};

  console.log(useSelector(v => v));

  useEffect(() => {
    return () => {
      dispatch(saveToStorage());
    };
  }, []);

  const themeSelector = (
    <FieldWrapper title={'Theme'}>
      <Dropdown
        style={{backgroundColor: primaryColor, ...styles.dropdownStyle}}
        itemStyle={{backgroundColor: primaryColor}}
        textStyle={styles.dropDownText}
        data={themes}
        value={theme}
        onChange={v => dispatch(setTheme(v))}
      />
    </FieldWrapper>
  );

  return <View style={styles.root}>{themeSelector}</View>;
};
export default SettingsScreen;

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
