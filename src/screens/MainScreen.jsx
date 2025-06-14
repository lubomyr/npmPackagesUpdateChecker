import React, {useState, useEffect, useMemo} from 'react';
import {View, StyleSheet, FlatList, Text, Platform} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {Button, TextInput} from '../components';
import {packagesStore} from '../observers/packageStore';
import {PackageItem} from '../components';
import {withLoader} from '../hocs/withLoader';
import {
  getPackageAllTags,
  getPackageDistTags,
  getSuggestions,
} from '../helpers/apiHelper';
import {SearchItem} from '../components/SearchItem';
import {setRefreshMainScreenCallback} from '../helpers/callbackHelper';
import {withProgress} from '../hocs/withProgress';
import {showNotification} from '../helpers/notificationHelper';

let updateChecked = false;

const MainScreen = props => {
  const {navigation, setLoading, setShowProgress, setProgress} = props;
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const {styles: themeStyles} = useTheme();
  const {packages, addPackage, updatePackage, saveToStorage} = packagesStore;

  const refresh = () => {
    setInputValue('');
  };

  const checkPackageName = async (packageName, progress) => {
    const dist = await getPackageDistTags(packageName);
    setProgress(progress);
    const {latest} = dist || {};
    if (latest) {
      const existingItem = packages.find(i => i?.name === packageName);
      if (existingItem) {
        updatePackage({
          name: packageName,
          dist,
        });
      } else {
        addPackage({
          name: packageName,
          dist,
        });
      }
      if (!existingItem || !existingItem?.time[latest]) {
        const fullDetail = await getPackageAllTags(packageName);
        if (fullDetail?.time) {
          showNotification(`${packageName} updated to ${dist?.latest}`);
          updatePackage({name: packageName, time: fullDetail?.time});
        }
      }
    }
  };

  const checkUpdates = async () => {
    if (packages?.length) {
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        setShowProgress(true);
      } else {
        setLoading(true);
      }
      setProgress(0);
      await Promise.all(
        packages.map(async (i, index) => {
          let progress = (index + 1) / packages?.length;
          await checkPackageName(i?.name, progress);
        }),
      );
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        setShowProgress(false);
      } else {
        setLoading(false);
      }
      saveToStorage();
    }
  };

  const retrieveSuggestions = async text => {
    setLoading(true);
    const results = await getSuggestions(text);
    setLoading(false);
    setSuggestions(results);
  };

  useEffect(() => {
    if (inputValue) {
      retrieveSuggestions(inputValue).then();
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  useEffect(() => {
    if (!updateChecked && packages.length) {
      updateChecked = true;
      checkUpdates();
    }
  }, [packages]);

  useEffect(() => setRefreshMainScreenCallback(() => refresh()), []);

  const sortedList = useMemo(() => {
    return packages.slice().sort((a, b) => {
      const timeA = a?.time[a?.dist?.latest];
      const timeB = b?.time[b?.dist?.latest];
      return timeA < timeB ? 1 : timeA > timeB ? -1 : 0;
    });
  }, [packages]);

  const searchResultView = (
    <View style={[themeStyles.primaryBackground, styles.list]}>
      {suggestions?.length ? (
        <FlatList
          data={suggestions}
          renderItem={({item}) => (
            <SearchItem
              style={styles.listItem}
              data={item}
              onViewPress={() => {
                //setInputValue(null);
                //addPackageName(item?.name).then();
                navigation.navigate('PackageDetails', {
                  packageName: item?.name,
                });
              }}
            />
          )}
          keyExtractor={item => item.name}
        />
      ) : (
        <Text style={[themeStyles.primaryTextInBackground, styles.noResults]}>
          No results
        </Text>
      )}
    </View>
  );

  const listView = sortedList ? (
    <View style={[themeStyles.primaryBackground, styles.list]}>
      <FlatList
        data={sortedList}
        renderItem={({item}) => (
          <PackageItem
            style={styles.listItem}
            value={item}
            onPress={() =>
              navigation.navigate('PackageDetails', {packageName: item?.name})
            }
          />
        )}
        keyExtractor={item => item.name}
        refreshing={false}
        onRefresh={() => {
          updateChecked = false;
          checkUpdates();
        }}
      />
    </View>
  ) : null;

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <TextInput
          style={[styles.textInput, themeStyles.primaryTextInput]}
          value={inputValue}
          onChangeText={text => setInputValue(text)}
        />
        {inputValue?.length ? (
          <Button
            style={styles.cancelButton}
            title={'Cancel'}
            onPress={() => setInputValue(null)}
          />
        ) : null}
      </View>
      {inputValue?.length ? searchResultView : listView}
    </View>
  );
};
export default withLoader(withProgress(observer(MainScreen)));

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  buttons: {
    marginVertical: 15,
  },
  row: {
    flexDirection: 'row',
  },
  list: {
    flex: 1,
    marginTop: 20,
    borderRadius: 10,
  },
  listItem: {},
  textInput: {flex: 1},
  cancelButton: {
    marginLeft: 10,
  },
  noResults: {
    margin: 20,
  },
});
