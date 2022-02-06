import {observable, action, toJS} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

const packagesKey = 'packages';

export const packagesStore = observable({
  packages: [],
  setPackages: action(value => {
    packagesStore.packages = value;
  }),
  addPackage: value => {
    packagesStore.setPackages([...packagesStore.packages, value]);
  },
  updatePackage: value => {
    const item = packagesStore.packages.find(i => i?.name === value?.name);
    if (value?.dist) {
      item.dist = value.dist;
    }
    if (value.time) {
      item.time = value.time;
    }
    packagesStore.setPackages(toJS(packagesStore.packages));
  },
  deletePackage: value => {
    const list = packagesStore.packages.filter(i => i?.name !== value?.name);
    packagesStore.setPackages(list);
  },
  saveToStorage: () => {
    AsyncStorage.setItem(packagesKey, JSON.stringify(packagesStore.packages));
  },
  retrieveFromStorage: async () => {
    const data = await AsyncStorage.getItem(packagesKey);
    if (data) {
      packagesStore.setPackages(JSON.parse(data));
    }
  },
});
