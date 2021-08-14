import React, { } from 'react';
import { View as RNView, TouchableOpacity, ViewPropTypes } from 'react-native';
import propTypes from 'prop-types';

const View = props => {
    return props.onPress ? <TouchableOpacity {...props} /> : <RNView {...props} />;
};

View.propTypes = {
    ...ViewPropTypes,
    onPress: propTypes.func,
    activeOpacity: propTypes.number
};

export { View };