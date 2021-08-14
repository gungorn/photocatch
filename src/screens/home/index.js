import React, { useState, useEffect } from 'react';
import { ScrollView, StatusBar, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import CameraRoll from "@react-native-community/cameraroll";
import Carousel from 'react-native-snap-carousel';

import { AUTOSVG, OFFSVG, ONSVG, TORCHSVG } from '~/assets';

import { Text, View, ScalableImage } from '~/components';
import { h, H, sbh, screen, W, w } from '~/utils/dimensions';

let cameraRef = React.createRef();
let topH = 0, bottomH = 0;

const flashModeIcons = {
    [RNCamera.Constants.FlashMode.auto]: { i: AUTOSVG, width: 32, height: 32 },
    [RNCamera.Constants.FlashMode.on]: { i: ONSVG, width: 32, height: 32 },
    [RNCamera.Constants.FlashMode.off]: { i: OFFSVG, width: 32, height: 32 },
    [RNCamera.Constants.FlashMode.torch]: { i: TORCHSVG, width: 32, height: 32 },
};

const Home = () => {
    const [flashMode, setFlashMode] = useState(RNCamera.Constants.FlashMode.auto);
    const [photosUri, setPhotosUri] = useState([]);
    const [galleryFullscreen, setGalleryFullScreen] = useState(false);

    useEffect(() => {
        getGallery();
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
                console.log(d);
                const x = await CameraRoll.save(d.uri);
                console.log('x', x);
                getGallery();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const flashModeButton = () => {
        if (flashMode === RNCamera.Constants.FlashMode.auto) setFlashMode(RNCamera.Constants.FlashMode.on);
        else if (flashMode === RNCamera.Constants.FlashMode.on) setFlashMode(RNCamera.Constants.FlashMode.off);
        else if (flashMode === RNCamera.Constants.FlashMode.off) setFlashMode(RNCamera.Constants.FlashMode.torch);
        else setFlashMode(RNCamera.Constants.FlashMode.auto);
    };

    const getGallery = async () => {
        const { edges } = await CameraRoll.getPhotos({
            //fromTime: new Date().getTime() - 12 * 60 * 60 * 1000,
            //toTime: new Date().getTime(),
            first: 100
        });
        const photos = [];
        edges.forEach(d => {
            photos.push({ ...d.node.image });
        });

        setPhotosUri(photos);

        return photos;
    };

    const galleryButton = () => {

    };

    const FlashIcon = flashModeIcons[flashMode];

    return (
        <View flex={1} style={styles.main}>
            <StatusBar translucent barStyle={'light-content'} backgroundColor={'transparent'} />

            <RNCamera
                ref={cameraRef}
                style={styles.camera}
                type={RNCamera.Constants.Type.back}
                flashMode={flashMode}
            //onBarCodeRead={() => {}}
            />


            <View
                style={styles.cameraTop}
                onLayout={d => (topH = d.nativeEvent.layout.height)}
            >
                <View style={styles.flashMode} onPress={flashModeButton}>
                    <FlashIcon.i width={FlashIcon.width} height={FlashIcon.height} />
                </View>
            </View>


            <View
                style={styles.cameraBottom}
                onLayout={d => (bottomH = d.nativeEvent.layout.height)}
            >
                <View style={styles.mainButtonBorder}>
                    <View style={styles.mainButton} onPress={mainButton} />
                </View>
            </View>

            {
                galleryFullscreen &&
                <View
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        width: w,
                        position: 'absolute',
                        top: topH,
                        bottom: bottomH,
                        left: 0
                    }}
                    onPress={() => setGalleryFullScreen(false)}
                    activeOpacity={1}
                />
            }


            {
                photosUri.length > 0 &&
                <View
                    style={galleryFullscreen ? styles.galleryFull : styles.galleryMini}
                    onPress={galleryFullscreen ? undefined : () => setGalleryFullScreen(true)}
                    activeOpacity={1}
                >
                    <Carousel
                        //ref={(c) => { this._carousel = c; }}
                        layout={'default'}
                        data={photosUri}
                        renderItem={d => (
                            <ScalableImage source={{ uri: d.item.uri }} width={galleryFullscreen ? W(70) : W(18)} />
                        )}
                        sliderWidth={galleryFullscreen ? W(100) : W(18)}
                        itemWidth={galleryFullscreen ? W(70) : W(18)}
                        inverted={false}
                        nestedScrollEnabled
                    />
                </View>
            }
        </View >
    );
};

const styles = StyleSheet.create({
    camera: {
        width: W(100),
        height: h + sbh
    },
    main: {
        justifyContent: 'center'
    },

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
    galleryMini: {
        width: W(18),
        aspectRatio: 1,
        position: 'absolute',
        bottom: 16,
        left: 32,
        overflow: 'hidden'
    },
    galleryFull: {
        width: W(100),
        left: 0,
        position: 'absolute',
        overflow: 'hidden'
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

export { Home };