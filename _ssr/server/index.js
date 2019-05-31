import express from 'express';
import webpack from 'webpack';
import { isDebug } from '../config/app';
// import { connect } from './db'; // AJ: Commented DB connection import.
import initExpress from './init/express';
import initRoutes from './init/routes';
import renderMiddleware from './render/middleware';
import applog from '../debug';

const app = express();

if (isDebug) {
    // enable webpack hot module replacement
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackConfig = require('../webpack/webpack.config');
    const devBrowserConfig = webpackConfig({ browser: true });
    const compiler = webpack(devBrowserConfig);
    compiler.apply(new webpack.ProgressPlugin());
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: devBrowserConfig.output.publicPath,
        serverSideRender: true
    }));
    app.use(webpackHotMiddleware(compiler));
}

applog('START');
/*
 * Bootstrap application settings
 */
initExpress(app);

/*
 * REMOVE if you do not need any routes
 *
 * Note: Some of these routes have passport and database model dependencies
 */
applog('INITIALIZE ROUTE');
initRoutes(app); // TODO: commented this as need to know for the express rounting..

/*
 * This is where the magic happens. We take the locals data we have already
 * fetched and seed our stores with data.
 * renderMiddleware matches the URL with react-router and renders the app into
 * HTML
 */
applog('REGISTER MIDDLEWARE');
app.get('*', renderMiddleware);

app.listen(app.get('port'));
