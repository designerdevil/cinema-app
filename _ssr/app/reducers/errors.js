import * as types from '../types';

const errors = (state = { ajaxRequestStatus: 'success' }, action) => {
    switch (action.type) {
        case 'AJAX_REQUEST_FAILURE': {
            return Object.assign({}, state, {
                ajaxRequestStatus: 'failure'
            });
        }
        case 'AJAX_REQUEST_SUCCESS': {
            return Object.assign({}, state, {
                ajaxRequestStatus: 'success'
            });
        }
        default:
            return state;
    }
};

export default errors;
