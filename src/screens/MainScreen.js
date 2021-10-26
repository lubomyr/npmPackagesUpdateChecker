import React, {useState, useEffect, useMemo} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {observer} from 'mobx-react-lite';
import {Button, TextInput} from '../components';
import {packagesStore} from '../observers/packageStore';
import {themeStore} from '../observers/themeStore';
import {PackageItem} from '../components';
import {withLoader} from '../hocs/withLoader';
import {getPackageAllTags, getPackageDistTags} from '../helpers/apiHelper';

const {getStyles} = themeStore;
let updateChecked = false;

const MainScreen = props => {
  const {navigation, setLoading} = props;
  const [inputValue, setInputValue] = useState('');
  const {packages, addPackage, updatePackage, saveToStorage} = packagesStore;
  const themeStyles = getStyles();

  const checkPackageName = async packageName => {
    const dist = await getPackageDistTags(packageName);
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
          updatePackage({name: packageName, time: fullDetail?.time});
        }
      }
    }
  };

  const checkUpdates = async () => {
    if (packages?.length) {
      setLoading(true);
      await Promise.all(
        packages.map(async i => {
          await checkPackageName(i?.name);
        }),
      );
      setLoading(false);
      saveToStorage();
    }
  };

  const addPackageName = async packageName => {
    setLoading(true);
    await checkPackageName(packageName);
    setLoading(false);
    saveToStorage();
  };

  useEffect(() => {
    if (!updateChecked && packages.length) {
      updateChecked = true;
      checkUpdates();
    }
  }, [packages]);

  const sortedList = useMemo(() => {
    return packages.slice().sort((a, b) => {
      const timeA = a?.time[a?.dist?.latest];
      const timeB = b?.time[b?.dist?.latest];
      return timeA < timeB ? 1 : timeA > timeB ? -1 : 0;
    });
  }, [packages]);

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
          style={[styles.textInput, themeStyles.primaryBackground]}
          value={inputValue}
          onChangeText={text => setInputValue(text)}
        />
        <Button
          style={styles.addPackageButton}
          title={'Add Package'}
          onPress={() => addPackageName(inputValue)}
        />
      </View>
      {listView}
    </View>
  );
};
export default withLoader(observer(MainScreen));

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
  addPackageButton: {
    marginLeft: 10,
  },
});
