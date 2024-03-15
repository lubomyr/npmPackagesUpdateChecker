import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import PropTypes from 'prop-types';
import {dimension} from '../styles';

export const Button = props => {
  const {colors} = useTheme();
  const {
    title = '',
    color = colors?.primaryColor,
    inverted,
    disabled,
    onPress,
    onLongPress,
    style,
    titleStyle = {},
  } = props;
  const {disabledColor, buttonTextColor} = colors;
  const RootView = disabled ? View : TouchableOpacity;
  const titleText = (
    <Text
      style={[
        {color: inverted ? color : buttonTextColor},
        titleStyle,
        styles.font,
      ]}>
      {title}
    </Text>
  );
  const inlineStyle = {
    backgroundColor: disabled
      ? disabledColor
      : inverted
        ? 'transparent'
        : color,
    borderColor: disabled ? disabledColor : color,
  };

  return (
    <RootView
      style={[styles.basic, inlineStyle, style]}
      onPress={onPress}
      onLongPress={onLongPress}>
      {titleText}
    </RootView>
  );
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string,
  color: PropTypes.string,
  inverted: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.array,
  ]),
  titleStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.array,
  ]),
};

const styles = StyleSheet.create({
  basic: {
    minHeight: dimension.inputHeight,
    minWidth: 60,
    paddingHorizontal: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  font: {
    fontWeight: 'bold',
  },
});
