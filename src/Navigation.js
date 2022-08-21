import React from 'react';
import {Platform} from 'react-native';
import {Button} from './components';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import SettingsScreen from './screens/SettingsScreen';
import PackageDetails from './screens/PackageDetails';
import {withTheme} from './hocs/withTheme';

const MainStack = createStackNavigator();
export const navigationRef = createNavigationContainerRef();

const getScreenOptions = ({navigation, title, theme}) => {
  const {primaryColor, backgroundColor} = theme || {};
  return {
    headerShown: true,
    title,
    cardStyle: {
      backgroundColor,
      minHeight: Platform.OS === 'web' ? '100vh' : '100%',
    },
    headerStyle: {backgroundColor: primaryColor},
    headerTintColor: '#fff',
    animationEnabled: false,
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: 0,
      },
    }),
    headerRight: ({tintColor}) => (
      <Button
        title={'Settings'}
        onPress={() => navigation.navigate('SettingsScreen')}
      />
    ),
  };
};

const MainStackNavigator = ({navigation, theme}) => (
  <MainStack.Navigator initialRouteName={'MainScreen'}>
    <MainStack.Screen
      name={'MainScreen'}
      component={MainScreen}
      options={getScreenOptions({navigation, title: 'npm packages', theme})}
    />
    <MainStack.Screen
      name={'SettingsScreen'}
      component={SettingsScreen}
      options={getScreenOptions({navigation, title: 'Setting', theme})}
    />
    <MainStack.Screen
      name={'PackageDetails'}
      component={PackageDetails}
      options={getScreenOptions({navigation, title: 'Package Details', theme})}
    />
  </MainStack.Navigator>
);

const Navigation = props => {
  const {theme} = props;
  return (
    <NavigationContainer ref={navigationRef}>
      <MainStackNavigator theme={theme} navigation={navigationRef} />
    </NavigationContainer>
  );
};
export default withTheme(Navigation);
