import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {useTheme} from '@react-navigation/native';
import PropTypes from 'prop-types';

export const ViewWithLoader = props => {
  const {style, children, isLoading} = props;
  const {colors} = useTheme();
  const {loaderColor} = colors;
  const loader = (
    <View style={styles.loaderLayout}>
      <ActivityIndicator size="large" color={loaderColor} />
    </View>
  );

  return (
    <View style={[styles.root, style]}>
      <View style={styles.flex}>{children}</View>
      {isLoading && loader}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  loaderLayout: {
    position: 'absolute',
    alignSelf: 'center',
  },
  flex: {
    flex: 1,
  },
});

ViewWithLoader.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.array,
  ]),
  isLoading: PropTypes.bool,
};
