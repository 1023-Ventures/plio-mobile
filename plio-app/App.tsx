import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/AppNavigation';
import { AuthProvider } from './src/contexts/AuthContext';
import { Router } from './src/navigation/Router';
import * as WebBrowser from 'expo-web-browser';
import { Provider } from 'react-redux';
import store from './src/store';
import { Appbar, DarkTheme, DefaultTheme, Provider as PaperProvider, Surface, ThemeProvider } from 'react-native-paper';
import {
    en,
    // nl,
    // de,
    // pl,
    // pt,
    enGB,
    registerTranslation
} from 'react-native-paper-dates';
// registerTranslation('en', en)
// registerTranslation('nl', nl)
// registerTranslation('pl', pl)
// registerTranslation('pt', pt)
// registerTranslation('de', de)
registerTranslation('en', en);

import 'intl';
import 'intl/locale-data/jsonp/en';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
    return (
        <Provider store={store}>
            <PaperProvider>
                <AuthProvider>
                    <Router />
                </AuthProvider>
            </PaperProvider>
        </Provider>
    );
}
