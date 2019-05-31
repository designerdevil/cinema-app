import * as types from '../types';

export default function theaters(state, action) {
    switch (action.type) {
        case types.THEATER: {
            return Object.assign([], state, action.data);
        }
        case types.ACTIVE_THEATER: {
            const id = action.data;
            const theater = state && state.filter(theater => theater._id == id);
            const data = theater.length ? theater : [{ _id: id }];
            return data;
        }
        default: {
            return state || [];
        }
    }
}
