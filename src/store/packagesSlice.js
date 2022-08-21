import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const packagesKey = 'packages';

export const retrievePackages = createAsyncThunk('packages/fetch', async () => {
  try {
    const data = await AsyncStorage.getItem(packagesKey);
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
});

export const packagesSlice = createSlice({
  name: 'package',
  initialState: {
    packages: [],
  },
  reducers: {
    setPackages: (state, action) => {
      state.packages = [...action.payload];
    },
    addPackage: (state, action) => {
      state.packages = [...state.packages, action.payload];
    },
    updatePackage: (state, action) => {
      const value = action.payload;
      const item =
        state?.packages && state.packages.find(i => i?.name === value?.name);
      if (value?.dist) {
        item.dist = value.dist;
      }
      if (value.time) {
        item.time = value.time;
      }
      state.packages = [...state.packages];
    },
    deletePackage: (state, action) => {
      const value = action.payload;
      const list = state.packages.filter(i => i?.name !== value?.name);
      return {packages: list};
    },
    saveToStorage: state => {
      AsyncStorage.setItem(packagesKey, JSON.stringify(state.packages || []));
    },
  },
  extraReducers: builder => {
    builder.addCase(retrievePackages.fulfilled, (state, action) => {
      state.packages = action.payload;
    });
  },
});

export const {addPackage, updatePackage, deletePackage, saveToStorage} =
  packagesSlice.actions;
