import routes from '../../app/routes';
import { matchRoutes } from 'react-router-config';
import configureStore from '../../app/store/configureStore';
import * as types from '../../app/types';
import pageRenderer from './pageRenderer';
import { preRenderMiddleware } from './preRenderMiddleware';
import applog from '../../debug';
import labels from '../locale/en';
import appConstants from '../../app/app-constants/app-constants';
/*
 * Export render function to be used in server/config/routes.js
 * We grab the state passed in from the server and the req object from Express/Koa
 * and pass it into the Router.run function.
 */
export default function render(req, res) {
    applog(`REQ-START URL=${req.url}`);
    const history = {};
    const store = configureStore(
        {
            app: {
                labels
            }
        },
        history
    );

    const branch = matchRoutes(routes, req.url);

    preRenderMiddleware(store.dispatch, branch, req, res)
        .then(() => {
            const html = pageRenderer(store, req.url);
            res.status(200).send(html);
            applog(`REQ-END URL = ${req.url}`);
        })
        .catch(error => {
            applog('Error in server/render/middleware.js render', error);
            // sendErrorResponse(error.body.data, req, res, store);
            applog('REQ-END');
            applog(`REQ-END URL = ${req.url}`);
        });
}
