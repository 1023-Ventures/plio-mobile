export const configs = {
    identityserver: {
        issuer: process.env.AUTH_URL,
        clientId: 'paleo-mobile',
        redirectUrl: 'io.identityserver.demo:/oauthredirect', //todo:  is this needed
        additionalParameters: {},
        scopes: ['openid', 'profile', 'email', 'offline_access']

        // serviceConfiguration: {
        //   authorizationEndpoint: 'https://demo.identityserver.io/connect/authorize',
        //   tokenEndpoint: 'https://demo.identityserver.io/connect/token',
        //   revocationEndpoint: 'https://demo.identityserver.io/connect/revoke'
        // }
    }
};
