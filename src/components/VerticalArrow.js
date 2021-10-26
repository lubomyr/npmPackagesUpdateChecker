import React from 'react';
import {Image} from 'react-native';
import {theme} from '../styles';
import PropTypes from 'prop-types';

const {primaryColor} = theme;

const VerticalArrow = props => {
  const {style, size = 10, color = primaryColor, down} = props;

  return (
    <Image
      style={[style, {width: size, height: size, tintColor: color}]}
      source={
        down
          ? require('../assets/images/arrows/arrowDown.png')
          : require('../assets/images/arrows/arrowUp.png')
      }
      resizeMode={'contain'}
    />
  );
};
export default VerticalArrow;

VerticalArrow.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.array,
  ]),
  down: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.number,
};
