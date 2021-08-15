import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { FLIPSVG } from '~/assets';

import { View } from '~/components';
import { W } from '~/utils/dimensions';

import { FRONT, BACK } from './constants';


const FlipButton = props => {
    const { type, setType } = props;

    return (
        <View
            style={[styles.flip, type === FRONT && styles.flipReversed]}
            onPress={() => setType(type === BACK ? FRONT : BACK)}
            activeOpacity={0.6}
        >
            <FLIPSVG width={48} height={48} />
        </View>
    );
};

const styles = StyleSheet.create({
    flip: {
        width: W(18),
        aspectRatio: 1,
        position: 'absolute',
        bottom: 16,
        right: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    flipReversed: {
        transform: [{ rotateY: '180deg' }]
    }
});

export { FlipButton };