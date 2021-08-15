import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';

import { h, sbh, W } from '~/utils/dimensions';

const Camera = props => {
    const { cameraRef, type, flashMode } = props;

    return useMemo(() => (
        <RNCamera
            ref={cameraRef}
            style={styles.camera}
            type={type}
            flashMode={flashMode}
        //onBarCodeRead={() => {}}
        />
    ), [cameraRef, type, flashMode]);
};

const styles = StyleSheet.create({
    camera: {
        width: W(100),
        height: h + sbh
    }
});

export { Camera };