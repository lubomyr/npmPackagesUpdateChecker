import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Button} from './Button';
import {getUpdatedLabel} from '../helpers/timeHelper';

export const SearchItem = props => {
  const {style, data, onViewPress} = props;
  const {name, date, version, description, publisher} = data;
  const {styles: themeStyles} = useTheme();

  return (
    <View style={[styles.row, style]}>
      <View style={styles.flex}>
        <Text style={[styles.bold, themeStyles.primaryTextInBackground]}>{name}</Text>
        <Text style={[styles.text, themeStyles.primaryTextInBackground]}>
          Version: {version}
        </Text>
        <Text style={[styles.text, themeStyles.primaryTextInBackground]}>
          Last update {getUpdatedLabel(date)}
        </Text>
        <Text style={[styles.text, themeStyles.primaryTextInBackground]}>
          Publisher: {publisher?.username}
        </Text>
        <Text style={[styles.text, themeStyles.primaryTextInBackground]}>
          Email: {publisher?.email}
        </Text>
        <Text style={[styles.text, themeStyles.primaryTextInBackground]}>
          Description: {description}
        </Text>
      </View>
      <View>
        <Button style={styles.button} title={'View'} onPress={onViewPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingStart: 8,
  },
  flex: {
    flex: 1,
  },
  button: {
    borderWidth: 1,
    borderColor: '#888888',
    marginRight: 10,
    minHeight: 36,
  },
  bold: {
    fontWeight: 'bold',
  },
});
