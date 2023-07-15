import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
  Modal,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import VerticalArrow from './VerticalArrow';
import {dimension} from '../styles';
import {deviceHeight} from '../helpers/dimensionHelper';
import PropTypes from 'prop-types';

const topMagicMargin =
  Platform.OS === 'android' || Platform.OS === 'web' ? 47 : 0;
const rowHeight = 36;

export const Dropdown = props => {
  const [isOpen, setOpen] = useState(false);
  const [pos, setPos] = useState({x: 0, y: 0, width: 0});
  const [value, setValue] = useState(props.value);
  const [openUp, setOpenUp] = useState(false);
  const emptyViewRef = useRef(null);
  const isMounted = useRef(true);
  const {colors} = useTheme();
  const {backgroundColor, arrowColor} = colors;

  const setModalPosition = () => {
    if (emptyViewRef && emptyViewRef.current) {
      emptyViewRef.current.measure((fx, fy, width, height, px, py) => {
        const maxYPos =
          py +
          Math.min(
            rowHeight * props.data.length + topMagicMargin,
            deviceHeight / 2.5,
          );
        const openUpValue = Boolean(
          isOpen && maxYPos > deviceHeight && height < deviceHeight / 2,
        );
        if (isMounted.current) {
          setPos({x: px, y: py, width});
          setOpenUp(openUpValue);
        }
      });
    }
  };

  useEffect(() => {
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setModalPosition();
    }
  }, [isOpen, setModalPosition]);

  const openClose = () => {
    if (!disabled) {
      setOpen(!isOpen);
    }
  };

  const onSelect = inputValue => {
    setValue(inputValue);
    if (props.onChange !== undefined) {
      props.onChange(inputValue);
    }
    openClose();
  };

  const {
    style,
    data,
    placeholder = 'Select...',
    keyExtractor = v => (v?.id ? v.id : value),
    labelExtractor = v => (v?.name ? v.name : value),
    customItemView,
    textStyle,
    itemStyle,
    arrowStyle,
    useModal = true,
    disabled = false,
    hideInternalBorder = false,
    changeArrowWhenOpen = false,
  } = props;
  const selectedText = value ? labelExtractor(value) : placeholder;
  const selectedInternalBorderStyle =
    hideInternalBorder &&
    isOpen &&
    (openUp ? styles.withoutTopBorder : styles.withoutBottomBorder);

  const selectedView = (
    <TouchableWithoutFeedback
      onPress={() => {
        if (!disabled) {
          setOpen(!isOpen);
        }
      }}>
      <View
        style={[
          styles.selectedView,
          styles.border,
          selectedInternalBorderStyle,
        ]}>
        {customItemView && value ? (
          customItemView(value)
        ) : (
          <Text style={[styles.selectedText, textStyle]}>{selectedText}</Text>
        )}

        <VerticalArrow
          style={[styles.verticalArrow, arrowStyle]}
          down={!(changeArrowWhenOpen && isOpen)}
          color={arrowColor}
          size={dimension.arrows}
        />
      </View>
    </TouchableWithoutFeedback>
  );

  const itemList = data.map((v, index) => {
    const key = props.keyExtractor ? keyExtractor(v) : index;
    const text = labelExtractor(v);
    const itemView = customItemView ? (
      customItemView(v)
    ) : (
      <View style={{height: rowHeight, ...styles.listItem}}>
        <Text style={[styles.itemText, textStyle]}>{text}</Text>
      </View>
    );
    return (
      <TouchableWithoutFeedback key={key} onPress={() => onSelect(v)}>
        {itemView}
      </TouchableWithoutFeedback>
    );
  });

  const platformStyle = Platform.select({
    android: styles.listView,
    ios: {},
    web: styles.listView,
  });

  const listInternalBorderStyle =
    hideInternalBorder &&
    (openUp ? styles.withoutBottomBorder : styles.withoutTopBorder);

  const listView = isOpen ? (
    <ScrollView
      style={[
        {backgroundColor: backgroundColor},
        styles.border,
        styles.listLayout,
        platformStyle,
        listInternalBorderStyle,
        itemStyle,
        //{backgroundColor: enableInputBackground},
      ]}>
      {itemList}
    </ScrollView>
  ) : null;

  const emptyView = useModal ? (
    <TouchableOpacity ref={emptyViewRef} style={styles.fullWidth} />
  ) : null;

  const modalView =
    pos && pos.y !== undefined ? (
      <Modal
        transparent={true}
        visible={isOpen}
        onRequestClose={() => setOpen(false)}>
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View style={styles.modalRootView}>
            <View
              style={[
                {
                  start: pos.x,
                  width: pos.width,
                },
                openUp
                  ? {
                      top:
                        pos.y -
                        topMagicMargin -
                        4 -
                        dimension.inputHeight -
                        Math.min(data.length * rowHeight, deviceHeight / 2.5),
                    }
                  : {top: pos.y - topMagicMargin},
              ]}>
              {listView}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    ) : null;

  const listLayout = useModal ? modalView : listView;

  return (
    <View style={style}>
      {selectedView}
      {emptyView}
      {!disabled && listLayout}
    </View>
  );
};

Dropdown.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.array,
  ]),
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  keyExtractor: PropTypes.func,
  labelExtractor: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  arrowStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
  selectedView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: dimension.inputHeight,
  },
  selectedText: {
    flex: 1,
    fontSize: 12,
    padding: 6,
  },
  border: {
    //borderWidth: 1,
    //borderColor: borderColor,
    borderRadius: 4,
  },
  listView: {
    top: dimension.inputHeight,
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  itemText: {
    fontSize: 12,
    padding: 5,
  },
  listLayout: {
    marginTop: 2,
    zIndex: 1,
    maxHeight: deviceHeight / 2.5,
  },
  modalRootView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  withoutBottomBorder: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  withoutTopBorder: {
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  fullWidth: {
    width: '100%',
  },
  verticalArrow: {
    marginEnd: 10,
  },
  listItem: {
    justifyContent: 'center',
  },
});
