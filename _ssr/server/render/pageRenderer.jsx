import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import staticAssets from './static-assets';
import routes from '../../app/routes';

const createApp = (store, url) => {
    const context = {};
    return renderToString(<Provider store={store}>
        <StaticRouter location={url} context={context}>
            {renderRoutes(routes)}
        </StaticRouter>
    </Provider>);
};

const buildPage = ({ componentHTML, initialState, headAssets }) => `
<!doctype html>
<html lang="en">
	<head>
		${headAssets.title.toString()}
		${headAssets.meta.toString()}
		${headAssets.link.toString()}
		${staticAssets.createBootstrapCSS()}
		${staticAssets.createAppCSS()}
	</head>
	<body>
		<div id="app">${componentHTML}</div>
		<script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>
		${staticAssets.createAppScript()}
	</body>
</html>`;

export default (store, url) => {
    const initialState = store.getState();
    const componentHTML = createApp(store, url);
    const headAssets = Helmet.renderStatic();

    return buildPage({
        componentHTML,
        initialState,
        headAssets
    });
};
