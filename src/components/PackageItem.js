import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {getUpdatedLabel} from '../helpers/timeHelper';

export const PackageItem = props => {
  const {style, value, onPress} = props;
  const {name, dist, time} = value || {};
  const {latest} = dist || {};
  const unFormattedTime = time?.[latest];
  const timeLabel = unFormattedTime ? getUpdatedLabel(unFormattedTime) : '-';
  const {styles: themeStyles} = useTheme();

  return (
    <TouchableOpacity style={[styles.row, style]} onPress={onPress}>
      <Text style={[styles.text, themeStyles.primaryTextInBackground]}>{name}</Text>
      <Text style={[styles.textVer, themeStyles.primaryTextInBackground]}>
        {latest}
      </Text>
      <Text style={[styles.textTime, themeStyles.primaryTextInBackground]}>
        {timeLabel}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingStart: 8,
  },
  text: {
    flex: 1,
  },
  textVer: {
    flex: 0.35,
    textAlign: 'center',
  },
  textTime: {
    flex: 0.55,
  },
});
