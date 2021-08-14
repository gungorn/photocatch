import React, { } from 'react';
import { TextInput as RNTextInput } from 'react-native';

const TextInput = props => {
    return (
        <RNTextInput {...props} />
    );
};

TextInput.propTypes = {
    ...RNTextInput.propTypes
};

export { TextInput };