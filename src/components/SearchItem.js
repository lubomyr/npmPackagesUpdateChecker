import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {withTheme} from '../hocs/withTheme';
import {Button} from './Button';
import {getUpdatedLabel} from '../helpers/timeHelper';

export const SearchItem = withTheme(props => {
  const {style, data, onAddPress, themeStyles} = props;
  const {name, date, version, description, publisher} = data;

  return (
    <View style={[styles.row, style]}>
      <View style={styles.flex}>
        <Text style={[styles.bold, themeStyles.primaryBackground]}>{name}</Text>
        <Text style={[styles.text, themeStyles.primaryBackground]}>
          Version: {version}
        </Text>
        <Text style={[styles.text, themeStyles.primaryBackground]}>
          Last update {getUpdatedLabel(date)}
        </Text>
        <Text style={[styles.text, themeStyles.primaryBackground]}>
          Publisher: {publisher?.username}
        </Text>
        <Text style={[styles.text, themeStyles.primaryBackground]}>
          Email: {publisher?.email}
        </Text>
        <Text style={[styles.text, themeStyles.primaryBackground]}>
          Description: {description}
        </Text>
      </View>
      <View>
        <Button style={styles.button} title={'Add'} onPress={onAddPress} />
      </View>
    </View>
  );
});

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
    borderColor: 'white',
    marginRight: 10,
    minHeight: 36,
  },
  bold: {
    fontWeight: 'bold',
  },
});
