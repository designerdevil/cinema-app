import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, withRouter } from 'react-router-dom';
import { renderRoutes, matchRoutes } from 'react-router-config';
import configureStore from './store/configureStore';
import { preRenderMiddleware } from '../server/render/preRenderMiddleware';
import routes from '../app/routes';

const initialState = window.__INITIAL_STATE__;

if (window.__INITIAL_STATE__ !== null) {
    window.__INITIAL_STATE__ = null;
}
const store = configureStore(initialState, {});
const RouteDataLoader = withRouter(class extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname != this.props.location.pathname) {
            const branch = matchRoutes(
                this.props.routes,
                nextProps.location.pathname
            );
            const req = {
                url: nextProps.location.pathname,
                headers: {}
            };
            preRenderMiddleware(nextProps.dispatch, branch, req, null);
        }
    }

    render() {
        return this.props.children;
    }
});

ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <RouteDataLoader routes={routes} dispatch={store.dispatch}>
                {renderRoutes(routes)}
            </RouteDataLoader>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);
