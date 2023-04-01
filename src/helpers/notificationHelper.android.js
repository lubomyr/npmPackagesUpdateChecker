import {ToastAndroid} from 'react-native';
export const showNotification = message => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};
