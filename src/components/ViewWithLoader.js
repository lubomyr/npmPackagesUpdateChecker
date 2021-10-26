import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import {withTheme} from '../hocs/withTheme';

export const ViewWithLoader = withTheme(props => {
  const {style, children, isLoading, theme} = props;
  const {loaderColor} = theme;
  const loader = (
    <View style={styles.loaderLayout}>
      <ActivityIndicator size="large" color={loaderColor} />
    </View>
  );

  return (
    <View style={[styles.root, style]}>
      <View style={{flex: 1}}>{children}</View>
      {isLoading && loader}
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  loaderLayout: {
    position: 'absolute',
    alignSelf: 'center',
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
