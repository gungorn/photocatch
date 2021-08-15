import React, { } from 'react';
import { StyleSheet } from 'react-native';

import { AUTOSVG, OFFSVG, ONSVG, TORCHSVG } from '~/assets';

import { View } from '~/components';
import { AUTO, ON, OFF, TORCH } from '~/screens/home/constants';
import { sbh } from '~/utils/dimensions';
let topH = 0;

const flashModeIcons = {
    [AUTO]: { i: AUTOSVG, width: 32, height: 32 },
    [ON]: { i: ONSVG, width: 32, height: 32 },
    [OFF]: { i: OFFSVG, width: 32, height: 32 },
    [TORCH]: { i: TORCHSVG, width: 32, height: 32 },
};

const Top = props => {
    const { flashMode, setFlashMode } = props;

    const flashModeButton = () => {
        if (flashMode === AUTO) setFlashMode(ON);
        else if (flashMode === ON) setFlashMode(OFF);
        else if (flashMode === OFF) setFlashMode(TORCH);
        else setFlashMode(AUTO);
    };

    const FlashIcon = flashModeIcons[flashMode];

    return (
        <View
            style={styles.cameraTop}
            onLayout={d => (topH = d.nativeEvent.layout.height)}
        >
            <View style={styles.flashMode} onPress={flashModeButton}>
                <FlashIcon.i width={FlashIcon.width} height={FlashIcon.height} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cameraTop: {
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        paddingTop: sbh,
        paddingBottom: 16,
    },
    flashMode: {
        paddingHorizontal: 16
    },
});

export { Top };