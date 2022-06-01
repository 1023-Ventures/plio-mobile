import React, { useState } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { styles } from '../styles';

export function SplashScreen() {
    const [loading, isLoading] = useState(false);
    const auth = useAuth();

    const signIn = async () => {
        isLoading(true);
        await auth
            .signIn()
            .then((success) => {
                success || isLoading(false);
            })
            .catch((err) => {
                isLoading(false);
            });
    };

    return (
        <View style={styles.container}>
            <Text>Splash screen w/ sign up & sign in</Text>
            {loading ? <ActivityIndicator color={'#000'} animating={true} size="small" /> : <Button title="Sign In" onPress={signIn} />}
        </View>
    );
}
