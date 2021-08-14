import React, { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import { Text, View } from '~/components';
import { Home } from '~/screens/home';

const GRANTED = PermissionsAndroid.RESULTS.GRANTED;
const DENIED = PermissionsAndroid.RESULTS.DENIED;
const READ_EXTERNAL_STORAGE = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
const WRITE_EXTERNAL_STORAGE = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
const RECORD_AUDIO = PermissionsAndroid.PERMISSIONS.RECORD_AUDIO;
const CAMERA = PermissionsAndroid.PERMISSIONS.CAMERA;

const App = () => {
    useEffect(async () => {
        if (await PermissionsAndroid.check(READ_EXTERNAL_STORAGE) !== GRANTED) {
            await PermissionsAndroid.request(READ_EXTERNAL_STORAGE);
        }


        if (await PermissionsAndroid.check(WRITE_EXTERNAL_STORAGE) !== GRANTED) {
            await PermissionsAndroid.request(WRITE_EXTERNAL_STORAGE);

        }


        if (await PermissionsAndroid.check(RECORD_AUDIO) !== GRANTED) {
            await PermissionsAndroid.request(RECORD_AUDIO);

        }


        if (await PermissionsAndroid.check(CAMERA) !== GRANTED) {
            await PermissionsAndroid.request(CAMERA);
        }
    }, []);

    return (
        <View flex={1}>
            <Home />
        </View>
    );
};

export { App };