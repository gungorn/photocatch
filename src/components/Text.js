import React, { } from 'react';
import { Text as RNText, TextPropTypes } from 'react-native';

const Text = props => {
    return (
        <RNText {...props} />
    );
};

Text.propTypes = {
    ...TextPropTypes
};

export { Text };