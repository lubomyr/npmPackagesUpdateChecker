import {Dimensions} from 'react-native';

export const {width: deviceWidth, height: deviceHeight} =
  Dimensions.get('window');

export const percentWidth = percentage => {
  const value = (percentage * deviceWidth) / 100;
  return Math.round(value);
};

export const percentHeight = percentage => {
  const value = (percentage * deviceHeight) / 100;
  return Math.round(value);
};
