import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Alert } from 'react-native';
import Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import { configs } from '../configs';
import jwt_decode from 'jwt-decode';
import * as WebBrowser from 'expo-web-browser';
import { setAccessToken } from '@1023-ventures/darri-core';
import { addSeconds } from '../screens/home/calendar/dateUtils';
import axios from 'axios';
import { exp } from 'react-native-reanimated';

const AUTH_DATA_KEY = '@PlioAuthData';
const SCOPES = ['openid', 'profile', 'email', 'paleo-api', 'offline_access'];
const CLIENT_ID = 'paleo-mobile';

const useProxy = false;
const redirectUri = AuthSession.makeRedirectUri({
    useProxy,
    preferLocalhost: false
});

let interceptor: number | undefined = undefined;

export type AuthData = {
    email: string;
    name: string;
    hasLoggedInOnce: boolean;
    idToken: string;
    accessToken: string;
    accessTokenExpiresOn: Date;
    refreshToken: string;
};

type AuthContextData = {
    authData: AuthData;
    loading: boolean;
    signIn(): Promise<boolean>;
    signOut(): void;
};

type Props = PropsWithChildren<{}>;

const AuthContext = createContext<AuthContextData | null>(null);

const AuthProvider: React.FC<Props> = (props) => {
    const [authData, setAuthData] = useState<AuthData>({} as AuthData);
    const [loading, setLoading] = useState(true);
    const refreshInterceptorRef = useRef<number>();

    const discovery = AuthSession.useAutoDiscovery(configs.identityserver.issuer ?? '');

    const [request, result, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: CLIENT_ID,
            redirectUri,
            scopes: SCOPES,
            responseType: 'code'
        },
        discovery
    );

    useEffect(() => {
        if (refreshInterceptorRef.current != undefined) {
            console.log('****** ejecting current interceptor', refreshInterceptorRef.current);
            axios.interceptors.response.eject(refreshInterceptorRef.current);
            refreshInterceptorRef.current = undefined;
        }

        loadStorageData();

        refreshInterceptorRef.current = axios.interceptors.response.use(
            (response) => {
                console.log(authData.refreshToken);
                return response;
            },
            (responseError) => {
                console.log('(============================================');
                console.log(
                    'ierr--->',
                    responseError.response.config.headers.url,
                    refreshInterceptorRef.current,
                    responseError.response.status
                );
                console.log('err--->', responseError.response.status, responseError);
                console.log('refreshToken--->', authData.refreshToken);
                console.log('============================================)');

                const is401 = responseError && responseError.request?.status === 401;
                if (!is401) return Promise.reject(responseError);

                if (authData.refreshToken == undefined) {
                    // signOut();

                    console.log('refreshToken is undefined');
                } else {
                    console.log('refreshing token');

                    return AuthSession.refreshAsync(
                        {
                            refreshToken: authData.refreshToken,
                            clientId: CLIENT_ID,
                            scopes: SCOPES
                        },
                        discovery!
                    )
                        .then((refershResponse) => {
                            console.log('refreshed token');
                            handleTokenResponse(refershResponse);
                            // resubmit the request
                            const failedRequest = responseError.config;
                            failedRequest.headers['Authorization'] = 'Bearer ' + refershResponse.accessToken;
                            return axios.request(failedRequest);
                        })
                        .catch((refreshError) => {
                            console.log('refresh error:', refreshError);
                            // signOut();
                            return Promise.reject(responseError);
                        });
                }

                return Promise.reject(responseError);
            }
        );

        console.log(refreshInterceptorRef.current);
    }, []);

    async function loadStorageData(): Promise<void> {
        try {
            const authDataSerialized = await AsyncStorage.getItem(AUTH_DATA_KEY);
            if (authDataSerialized) {
                const _authData: AuthData = JSON.parse(authDataSerialized);
                setAuthData(_authData);
                setAccessToken(_authData.accessToken);
                console.log('loaded token with expiringOn: ', _authData.accessTokenExpiresOn, _authData.refreshToken);
            }
        } catch (error) {
            console.log('ERROR');
        } finally {
            setLoading(false);
        }
    }

    function handleTokenResponse(resp: AuthSession.TokenResponse) {
        const jwt = jwt_decode(resp.accessToken) as any;

        const updatedAuthData = {
            ...authData,
            email: jwt.email,
            idToken: resp.idToken ?? '',
            accessToken: resp.accessToken,
            refreshToken: resp.refreshToken ?? ''
        };

        const now = new Date();
        const expires = addSeconds(new Date(now), resp.expiresIn!);
        updatedAuthData.accessTokenExpiresOn = expires;

        setAuthData(updatedAuthData);
        setAccessToken(updatedAuthData.accessToken);
        AsyncStorage.setItem(AUTH_DATA_KEY, JSON.stringify(updatedAuthData));
    }

    const signIn = async () => {
        // console.log('*****************');
        // console.log(`redirectUri = ${redirectUri}`);
        // console.log('*****************');

        const authResponse = await promptAsync({ useProxy });
        if (authResponse.type != 'success') {
            return false;
        }

        // console.log('authResponse.params.code=');
        // console.log((authResponse as any).params.code);

        const codeExchangeResponse = await AuthSession.exchangeCodeAsync(
            {
                clientId: request!.clientId,
                scopes: request!.scopes,
                redirectUri: request!.redirectUri,
                code: (authResponse as any).params.code,
                extraParams: {
                    code_verifier: request!.codeVerifier ?? ''
                }
            },
            discovery!
        );

        handleTokenResponse(codeExchangeResponse);

        // const jwt = jwt_decode(codeExchangeResponse.accessToken) as any;
        // // console.log(codeExchangeResponse);

        // const _authData = {
        //     ...authData,
        //     email: jwt.email,
        //     idToken: codeExchangeResponse.idToken ?? '',
        //     accessToken: codeExchangeResponse.accessToken,
        //     refreshToken: codeExchangeResponse.refreshToken
        // };

        // const now = new Date();
        // const expires = addSeconds(new Date(now), codeExchangeResponse.expiresIn!);
        // _authData.accessTokenExpiresOn = expires;

        // console.log(codeExchangeResponse);
        // console.log('signIn complete, access token expires...', expires, _authData.refreshToken);

        // setAuthData(_authData);
        // setAccessToken(_authData.accessToken);
        // AsyncStorage.setItem(AUTH_DATA_KEY, JSON.stringify(_authData));

        return true;
    };

    const signOut = async () => {
        //console.log(authData);

        const params = new URLSearchParams({
            id_token_hint: authData.idToken,
            post_logout_redirect_uri: redirectUri
        });
        const uri = `${discovery?.endSessionEndpoint}?${params}`;

        // console.log('*****************');
        // console.log(uri);
        // console.log(params);
        // console.log('*****************');

        setAuthData({} as AuthData);
        WebBrowser.openAuthSessionAsync(uri, redirectUri, {});
        // WebBrowser.openBrowserAsync
    };

    return <AuthContext.Provider value={{ authData, loading, signIn, signOut }}>{props.children}</AuthContext.Provider>;
};

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export { AuthContext, AuthProvider, useAuth };
