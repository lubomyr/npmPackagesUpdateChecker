import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {getUpdatedLabel} from '../helpers/timeHelper';
import {withTheme} from '../hocs/withTheme';

export const PackageItem = withTheme(props => {
  const {style, value, themeStyles, onPress} = props;
  const {name, dist, time} = value || {};
  const {latest} = dist || {};
  const unFormattedTime = time?.[latest];
  const timeLabel = unFormattedTime ? getUpdatedLabel(unFormattedTime) : '-';

  return (
    <TouchableOpacity style={[styles.row, style]} onPress={onPress}>
      <Text style={[styles.text, themeStyles.primaryBackground]}>{name}</Text>
      <Text style={[styles.textVer, themeStyles.primaryBackground]}>
        {latest}
      </Text>
      <Text style={[styles.textTime, themeStyles.primaryBackground]}>
        {timeLabel}
      </Text>
    </TouchableOpacity>
  );
});

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
