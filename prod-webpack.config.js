const path = require("path");

const extractThemesPlugin = require('./MapStore2/build/themes.js').extractThemesPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
    base: __dirname,
    dist: path.join(__dirname, "dist"),
    framework: path.join(__dirname, "MapStore2", "web", "client"),
    code: [path.join(__dirname, "js"), path.join(__dirname, "MapStore2", "web", "client")]
};
const ModuleFederationPlugin = require('./MapStore2/build/moduleFederation').plugin;

const config = require('./MapStore2/build/buildConfig')(
    {
        'MapStore2-C040': path.join(__dirname, "js", "apps", "mapstore"),
        "embedded": path.join(__dirname, "js", "apps", "embedded"),
        "ms2-api": path.join(__dirname, "js", "apps", "api"),
        "llpp": path.join(__dirname, "js", "apps", "llpp")
    },
    {
        "themes/comge": path.join(__dirname, "assets", "themes", "comge", "theme.less")
    },
    paths,
    [extractThemesPlugin, ModuleFederationPlugin],
    true,
    "dist/", // the old value was "dist/"   ?
    null,
    [
        new HtmlWebpackPlugin({
            template: path.join(paths.base, 'indexTemplate.html'),
            chunks: ['MapStore2-C040'],
            inject: true,
            hash: true
        }),
        new HtmlWebpackPlugin({
            template: path.join(paths.base, 'embeddedTemplate.html'),
            chunks: ['embedded'],
            inject: true,
            hash: true,
            filename: 'embedded.html'
        }),
        new HtmlWebpackPlugin({
            template: path.join(paths.base, 'apiTemplate.html'),
            chunks: ['ms2-api'],
            inject: 'head',
            hash: true,
            filename: 'api.html'
        })
    ],
    {
        '@mapstore': path.resolve(__dirname, 'MapStore2/web/client'),
        '@js': path.resolve(__dirname, 'js')
    }
);

module.exports = config;
