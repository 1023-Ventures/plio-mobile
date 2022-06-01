const { createMetroConfiguration } = require('expo-yarn-workspaces');
const path = require('path');

module.exports = createMetroConfiguration(__dirname);

module.exports.resolver.extraNodeModules = {
    // '@1023-ventures/serra-common': path.resolve(__dirname + '/../node_modules/@1023-ventures')
};
