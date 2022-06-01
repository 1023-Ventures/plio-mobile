import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen } from '../screens/splash/SplashScreen';
import { MessagesScreen } from '../screens/home/messages/MessagesScreen';

const Stack = createStackNavigator();

export const AuthNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShadowVisible: false,
                headerStyle: {
                    elevation: 0
                }
            }}
        >
            <Stack.Screen name="Plio" component={SplashScreen} />
        </Stack.Navigator>
    );
};
