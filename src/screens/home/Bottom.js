import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";

import { View } from '~/components';
import { W } from '~/utils/dimensions';

let bottomH = 0;

const Bottom = props => {
    const { cameraRef, getGallery } = props;

    useEffect(() => {
    }, []);

    const mainButton = () => {
        TakePhoto();
    };

    const TakePhoto = async () => {
        if (!cameraRef.current) return;

        cameraRef.current.takePictureAsync({
            doNotSave: false
        })
            .then(async d => {
                await CameraRoll.save(d.uri);
                if (getGallery) getGallery();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const record = async () => {
        const videoData = await cameraRef.current.recordAsync({

        });
        console.log('videoData', videoData);
    };

    const stop = async () => {
        cameraRef.current.stopRecording();
    };

    return (
        <View
            style={styles.cameraBottom}
            onLayout={d => (bottomH = d.nativeEvent.layout.height)}
        >
            <View style={styles.mainButtonBorder}>
                <View style={styles.mainButton} onPress={mainButton} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cameraBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 16,
        flexDirection: 'row',
    },

    mainButtonBorder: {
        width: W(18),
        aspectRatio: 1,
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 3,
        borderRadius: W(16),
        padding: 4
    },
    mainButton: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: W(16),
        flex: 1
    }
});

export { Bottom };