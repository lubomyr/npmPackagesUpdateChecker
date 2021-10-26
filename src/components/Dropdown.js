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
import VerticalArrow from './VerticalArrow';
import {theme, dimension} from '../styles';
import {deviceHeight} from '../helpers/dimensionHelper';
import PropTypes from 'prop-types';

const {borderColor, backgroundColor, arrowColor} = theme;
const verticalMagicMargin =
  Platform.OS === 'android' || Platform.OS === 'web' ? 47 : 0;
const rowHeight = 36;

export const Dropdown = props => {
  const [isOpen, setOpen] = useState(false);
  const [pos, setPos] = useState({x: 0, y: 0, width: 0});
  const [value, setValue] = useState(props.value);
  const [openUp, setOpenUp] = useState(false);
  const emptyViewRef = useRef(null);
  const isMounted = useRef(true);

  const setModalPosition = () => {
    if (emptyViewRef && emptyViewRef.current) {
      emptyViewRef.current.measure((fx, fy, width, height, px, py) => {
        if (pos.x !== px || pos.y !== py) {
          const maxYPos =
            py + rowHeight * props.data.length + verticalMagicMargin;
          const openUpValue = Boolean(
            isOpen && maxYPos > deviceHeight && height < deviceHeight / 2,
          );
          if (isMounted.current) {
            setPos({x: px, y: py, width});
            setOpenUp(openUpValue);
          }
        }
      });
    }
  };

  useEffect(() => {
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    setModalPosition();
  });

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
    keyExtractor = v => (v.id ? v.id : value),
    labelExtractor = v => (v.name ? v.name : value),
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
          style={[{marginEnd: 10}, arrowStyle]}
          down={!(changeArrowWhenOpen && isOpen)}
          color={arrowColor}
          size={dimension.arrows}
        />
      </View>
    </TouchableWithoutFeedback>
  );

  const itemList = data.map((value, index) => {
    const key = props.keyExtractor ? keyExtractor(value) : index;
    const text = labelExtractor(value);
    const itemView = customItemView ? (
      customItemView(value)
    ) : (
      <View style={{height: rowHeight, justifyContent: 'center'}}>
        <Text style={[styles.itemText, textStyle]}>{text}</Text>
      </View>
    );
    return (
      <TouchableWithoutFeedback key={key} onPress={() => onSelect(value)}>
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
        styles.border,
        styles.listLayout,
        platformStyle,
        listInternalBorderStyle,
        itemStyle,
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
                        verticalMagicMargin -
                        4 -
                        dimension.inputHeight -
                        data.length * rowHeight,
                    }
                  : {top: pos.y - verticalMagicMargin},
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
    borderWidth: 1,
    //borderColor: borderColor,
    borderRadius: 4,
  },
  listView: {
    top: dimension.inputHeight,
    position: 'absolute',
    width: '100%',
    backgroundColor: theme.enableInputBackground,
    zIndex: 1,
  },
  itemText: {
    fontSize: 12,
    padding: 5,
  },
  listLayout: {
    backgroundColor: backgroundColor,
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
});
