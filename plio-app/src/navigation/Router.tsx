import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Loading } from '../components/Loading';
import { AppNavigation } from './AppNavigation';
import { AuthNavigation } from './AuthNavigation';
import { useAuth } from '../contexts/AuthContext';

export const Router = () => {
    const { authData, loading } = useAuth();
    console.log('checking auth...');

    if (loading) {
        return <Loading />;
    }

    return <NavigationContainer>{authData.accessToken ? <AppNavigation /> : <AuthNavigation />}</NavigationContainer>;
};
