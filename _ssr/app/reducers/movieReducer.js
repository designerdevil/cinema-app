import * as types from '../types';

export default function movies(state, action) {
    switch (action.type) {
        case types.MOVIE: {
            return Object.assign([], action.data);
        }
        case types.ACTIVE_MOVIE: {
            return Object.assign([], action.data);
        }
        default: {
            return state || [];
        }
    }
}
