const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoPreFixer = require('autoprefixer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = ({production = false, browser = false} = {}) => {
    const bannerOptions = {raw: true, banner: 'require("source-map-support").install();'};
    const uglifyOptions = {compress:{ warnings: false }};
    const compileTimeConstantForMinification = {__PRODUCTION__: JSON.stringify(production)};    
    if (!production && !browser) {
        return [
            new webpack.EnvironmentPlugin(['NODE_ENV']),
            new webpack.DefinePlugin(compileTimeConstantForMinification),
            new webpack.BannerPlugin(bannerOptions)
        ];
    }
    if (!production && browser) {
        return [
            new webpack.EnvironmentPlugin(['NODE_ENV']),
            new webpack.DefinePlugin(compileTimeConstantForMinification),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new ExtractTextPlugin({
                filename: 'styles/[name].css' //generates "app.css" and "bootstrap.css" files
            }),
            new webpack.LoaderOptionsPlugin({
                options: {
                    postcss: [autoPreFixer]
                },
                context: 'styles/[name].css',
            }),
        ];
    }
    if (production && !browser) {
        return [
            new webpack.EnvironmentPlugin(['NODE_ENV']),
            new webpack.DefinePlugin(compileTimeConstantForMinification),
            new webpack.BannerPlugin(bannerOptions),
            new UglifyJsPlugin({uglifyOptions})
        ];
    }
    if (production && browser) {
        return [
            new webpack.EnvironmentPlugin(['NODE_ENV']),
            new webpack.DefinePlugin(compileTimeConstantForMinification),
            new UglifyJsPlugin({uglifyOptions}),
            new webpack.LoaderOptionsPlugin({
                options: {
                    postcss: [autoPreFixer]
                }
            }),
            new ExtractTextPlugin({
                filename: 'styles/[name].min.css' //generates "app.css" and "bootstrap.css" files
            }),
            new OptimizeCssAssetsPlugin()
        ]
    }
    return [];
};
