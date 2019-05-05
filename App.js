import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { AppLoading, Asset, Font, Icon, Localization } from 'expo';
import Application from './src/Application';


import i18n from 'i18n-js';

const en = {
    foo: 'Foo',
    bar: 'Bar {{someValue}}',
};
const fr = {
    foo: 'como telle fous',
    bar: 'chatouiller {{someValue}}',
};


i18n.fallbacks = true;
i18n.translations = { fr, en };
i18n.locale = Localization.locale;

export default class App extends React.Component {
    state = {
        isLoadingComplete: false,
    };

    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={ this._loadResourcesAsync }
                    onError={ this._handleLoadingError }
                    onFinish={ this._handleFinishLoading }
                />
            );
        } else {
            return (
                <View style={ styles.container }>
                    { Platform.OS === 'ios' && <StatusBar barStyle="default"/> }
                    <Application/>
                </View>
            );
        }
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                require('./src/assets/images/robot-dev.png'),
                require('./src/assets/images/robot-prod.png'),
            ]),
            Font.loadAsync({
                ...Icon.Ionicons.font,
                'space-mono': require('./src/assets/fonts/SpaceMono-Regular.ttf'),
                'cairo-black': require('./src/assets/fonts/Cairo-Black.ttf'),
                'Roboto': require("native-base/Fonts/Roboto.ttf"),
                'Roboto_medium': require("native-base/Fonts/Roboto_medium.ttf")
            }),
        ]);
    };

    _handleLoadingError = error => {
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
