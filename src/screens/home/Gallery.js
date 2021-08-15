import React, { useMemo, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import CameraRoll from "@react-native-community/cameraroll";

import { View, ScalableImage } from '~/components';
import { W, w } from '~/utils/dimensions';

let topH = 0, bottomH = 0;

const Gallery = props => {
    const { setCallback } = props;
    const [galleryFullscreen, setGalleryFullScreen] = useState(false);
    const [photosUri, setPhotosUri] = useState([]);

    useEffect(() => {
        getGallery();
    }, []);

    const getGallery = async () => {
        const { edges } = await CameraRoll.getPhotos({ first: 100 });

        const photos = [];
        edges.forEach(d => photos.push({ ...d.node.image }));

        setPhotosUri(photos);
    };

    setCallback(getGallery);

    return useMemo(() => (
        <>
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
                    onPress={galleryFullscreen ? undefined : () => {
                        //LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                        setGalleryFullScreen(true);
                    }}
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
        </>
    ), [galleryFullscreen, photosUri]);
};

const styles = StyleSheet.create({
    galleryMini: {
        width: W(18),
        aspectRatio: 1,
        position: 'absolute',
        bottom: 16,
        left: 32,
        overflow: 'hidden',
        borderRadius: 12
    },
    galleryFull: {
        width: W(100),
        left: 0,
        position: 'absolute',
        overflow: 'hidden',
        zIndex: 99
    }
});

export { Gallery };