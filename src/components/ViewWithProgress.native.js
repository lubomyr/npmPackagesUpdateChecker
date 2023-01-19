import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as Progress from 'react-native-progress';
import PropTypes from 'prop-types';
import {withTheme} from '../hocs/withTheme';

export const ViewWithProgress = withTheme(props => {
  const {style, children, isShow, progress, theme} = props;
  const {loaderColor} = theme;
  const progressBar = (
    <View style={styles.loaderLayout}>
      <Progress.Circle
        progress={progress}
        size={100}
        showsText
        textStyle={{color: 'white'}}
      />
    </View>
  );

  return (
    <View style={[styles.root, style]}>
      <View style={styles.flex}>{children}</View>
      {isShow && progressBar}
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
  flex: {
    flex: 1,
  },
});

ViewWithProgress.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.array,
  ]),
  isLoading: PropTypes.bool,
};
