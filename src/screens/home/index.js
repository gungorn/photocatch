import React, { useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';

import { View } from '~/components';
import { Camera } from '~/screens/home/Camera';
import { Gallery } from '~/screens/home/Gallery';
import { Top } from '~/screens/home/Top';
import { Bottom } from '~/screens/home/Bottom';
import { FlipButton } from '~/screens/home/FlipButton';
import { BACK } from './constants';

let cameraRef = React.createRef();


const Home = () => {
    const [flashMode, setFlashMode] = useState(RNCamera.Constants.FlashMode.auto);
    const [type, setType] = useState(BACK);
    const [getGallery, setGallery] = useState(null);

    return (
        <View flex={1} style={styles.main}>
            <StatusBar translucent barStyle={'light-content'} backgroundColor={'transparent'} />

            <Camera cameraRef={cameraRef} type={type} flashMode={flashMode} />

            <Top flashMode={flashMode} setFlashMode={setFlashMode} />
            <Gallery setCallback={getGallery ? () => null : setGallery} />
            <FlipButton type={type} setType={setType} />

            <Bottom cameraRef={cameraRef} getGallery={getGallery} />
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        justifyContent: 'center'
    },
});

export { Home };