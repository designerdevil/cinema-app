import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import theaters from './theatreReducer';
import movies from './movieReducer';
import errors from './errors';
import app from './appReducer';
import * as types from '../types';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
    routing,
    errors,
    theaters,
    movies,
    app
});

export default rootReducer;
