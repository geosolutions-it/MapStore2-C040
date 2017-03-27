const webpackConfig = require('./webpack.config.js');
const path = require("path");
const LoaderOptionsPlugin = require("webpack/lib/LoaderOptionsPlugin");
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const NormalModuleReplacementPlugin = require("webpack/lib/NormalModuleReplacementPlugin");
const NoEmitOnErrorsPlugin = require("webpack/lib/NoEmitOnErrorsPlugin");
const extractThemesPlugin = require('./MapStore2/themes.js').extractThemesPlugin;

webpackConfig.plugins = [
    new LoaderOptionsPlugin({
        debug: false,
        options: {
           postcss: {
               plugins: [
                   require('postcss-prefix-selector')({prefix: '.ms2', exclude: ['.ms2']})
               ]
           },
           context: __dirname
       }
    }),
    new DefinePlugin({
        "__DEVTOOLS__": false
    }),
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new NormalModuleReplacementPlugin(/leaflet$/, path.join(__dirname, "MapStore2", "web", "client", "libs", "leaflet")),
    new NormalModuleReplacementPlugin(/openlayers$/, path.join(__dirname, "MapStore2", "web", "client", "libs", "openlayers")),
    new NormalModuleReplacementPlugin(/cesium$/, path.join(__dirname, "MapStore2", "web", "client", "libs", "cesium")),
    new NormalModuleReplacementPlugin(/proj4$/, path.join(__dirname, "MapStore2", "web", "client", "libs", "proj4")),
     new ParallelUglifyPlugin({
        uglifyJS: {
            sourceMap: false,
            compress: {warnings: false},
            mangle: true
        }
    }),
    new NoEmitOnErrorsPlugin(),
    extractThemesPlugin
];
webpackConfig.devtool = undefined;

// this is a workaround for this issue https://github.com/webpack/file-loader/issues/3
// use `__webpack_public_path__` in the index.html when fixed
webpackConfig.output.publicPath = "/MapStore2/dist/";

module.exports = webpackConfig;
