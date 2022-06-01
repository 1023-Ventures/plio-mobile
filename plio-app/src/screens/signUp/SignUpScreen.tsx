import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { AppRoutes } from '../../navigation/appRoutes';

type Props = {
    navigation: NavigationProp<AppRoutes, 'SignUp'>;
};

export function SignUpScreen(props: Props) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Sign Up Screen</Text>
            <Button onPress={() => props.navigation.goBack()} title="Go Back"></Button>
        </View>
    );
}
