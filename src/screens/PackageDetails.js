import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {withLoader} from '../hocs/withLoader';
import {getPackageAllTags} from '../helpers/apiHelper';
import {Button} from '../components';
import {themeStore} from '../observers/themeStore';
import {packagesStore} from '../observers/packageStore';
import {getUpdatedLabel} from '../helpers/timeHelper';

const {getStyles} = themeStore;

const PackageDetails = props => {
  const {navigation, route, setLoading} = props;
  const {packageName} = route?.params;
  const [details, setDetails] = useState(null);
  const themeStyles = getStyles();
  const {deletePackage, saveToStorage} = packagesStore;
  const {name, time, homepage, repository, description, license, maintainers} =
    details || {};
  const distTags = details?.['dist-tags'];
  const getKeys = object => Object.keys(object);

  const retrievePackageDetails = async packageName => {
    setLoading(true);
    const fullDetail = await getPackageAllTags(packageName);
    if (fullDetail) {
      setDetails(fullDetail);
    }
    setLoading(false);
  };

  const getRepositoryUrl = value => {
    const isGit = value.indexOf('git+') !== -1;
    return isGit ? value.substring(4, value.length) : value;
  };

  useEffect(() => {
    retrievePackageDetails(packageName).then();
  }, []);

  const topContainer = details ? (
    <View style={styles.row}>
      <View style={[styles.titleView, themeStyles.primaryBackground]}>
        <Text style={[styles.titleText, themeStyles.primaryBackground]}>
          {name}
        </Text>
      </View>
      <Button
        style={styles.button}
        title={'Remove'}
        onPress={() => {
          deletePackage({name: packageName});
          saveToStorage();
          navigation.goBack();
        }}
      />
    </View>
  ) : null;

  const distKeys = distTags ? getKeys(distTags) : [];
  const distList = distKeys.map(key => (
    <View key={key} style={styles.row}>
      <Text style={[styles.keyText, themeStyles.primaryBackground]}>{key}</Text>
      <Text style={[styles.valueText, themeStyles.primaryBackground]}>
        {distTags[key]}
      </Text>
      <Text style={[styles.timeText, themeStyles.primaryBackground]}>
        {getUpdatedLabel(time[distTags[key]])}
      </Text>
    </View>
  ));

  const distView = distTags ? (
    <View style={[styles.containerView, themeStyles.primaryBackground]}>
      <Text style={[styles.textBold, themeStyles.primaryBackground]}>
        dist-tags
      </Text>
      {distList}
    </View>
  ) : null;

  const homepageView = homepage ? (
    <View style={[styles.containerView, themeStyles.primaryBackground]}>
      <Text style={[styles.textBold, themeStyles.primaryBackground]}>
        Home page
      </Text>
      <TouchableOpacity onPress={() => Linking.openURL(homepage)}>
        <Text style={[styles.text, themeStyles.primaryBackground]}>
          {homepage}
        </Text>
      </TouchableOpacity>
    </View>
  ) : null;

  const repositoryView = repository ? (
    <View style={[styles.containerView, themeStyles.primaryBackground]}>
      <Text style={[styles.textBold, themeStyles.primaryBackground]}>
        Repository
      </Text>
      <TouchableOpacity
        onPress={() => Linking.openURL(getRepositoryUrl(repository?.url))}>
        <Text style={[styles.text, themeStyles.primaryBackground]}>
          {repository?.url}
        </Text>
      </TouchableOpacity>
    </View>
  ) : null;

  const descriptionView = description ? (
    <View style={[styles.containerView, themeStyles.primaryBackground]}>
      <Text style={[styles.textBold, themeStyles.primaryBackground]}>
        Description
      </Text>
      <View>
        <Text style={[styles.text, themeStyles.primaryBackground]}>
          {description}
        </Text>
      </View>
    </View>
  ) : null;

  const licenseView = description ? (
    <View style={[styles.containerView, themeStyles.primaryBackground]}>
      <Text style={[styles.textBold, themeStyles.primaryBackground]}>
        License
      </Text>
      <View>
        <Text style={[styles.text, themeStyles.primaryBackground]}>
          {license}
        </Text>
      </View>
    </View>
  ) : null;

  const maintainersView = maintainers?.length ? (
    <View style={[styles.containerView, themeStyles.primaryBackground]}>
      <Text style={[styles.textBold, themeStyles.primaryBackground]}>
        Maintainers
      </Text>
      <View style={styles.maintainers}>
        {maintainers.map(i => (
          <View key={i?.email} style={styles.row}>
            <Text
              style={[styles.maintainerName, themeStyles.primaryBackground]}>
              {i?.name}
            </Text>
            <Text
              style={[styles.maintainerEmail, themeStyles.primaryBackground]}>
              {i?.email}
            </Text>
          </View>
        ))}
      </View>
    </View>
  ) : null;

  return (
    <ScrollView>
      <View style={styles.root}>
        {topContainer}
        {distView}
        {descriptionView}
        {homepageView}
        {repositoryView}
        {licenseView}
        {maintainersView}
      </View>
    </ScrollView>
  );
};
export default withLoader(observer(PackageDetails));

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  list: {
    marginTop: 20,
    borderRadius: 10,
  },
  button: {
    marginLeft: 10,
  },
  titleView: {
    flex: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  containerView: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
  },
  textBold: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  keyText: {flex: 0.7},
  valueText: {flex: 1},
  timeText: {flex: 0.7, marginLeft: 5},
  maintainers: {alignItems: 'flex-start'},
  maintainerName: {width: 100},
  maintainerEmail: {flex: 1},
});
