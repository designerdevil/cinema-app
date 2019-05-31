import AjaxFactoryUtil from 'utils/ajaxFactoryUtil';
import { MOVIE, ACTIVE_MOVIE } from '../types';
import expressEndPointURL from '../app-constants/express-endpoint-url';
import appConstants from '../app-constants/app-constants';
import { setActiveTheater } from './theaterAction';
import { actionlog } from '../../debug';

export const setMovies = data => ({
    type: MOVIE,
    data
});
export const setActiveMovie = data => ({
    type: ACTIVE_MOVIE,
    data
});

export const selectSeats = (seats, movie, theater, date, time) => {
    const options = {
        method: expressEndPointURL.MOVIE_SEAT_SELECT.method,
        url: `${
            expressEndPointURL.MOVIE_SEAT_SELECT.url
        }?seats=${seats}&movie=${movie}&theater=${theater}&date=${date}&time=${time}`
    };
    return dispatch =>
        AjaxFactoryUtil.triggerServerRequest(options)
            .then(value => {
                console.log('DonE');
                actionlog(`MOVIE_ACTION SEAT_SELECT END, DATA = ${JSON.stringify(value)}`);
            })
            .catch(error => {
                actionlog(`HOMEPAGE DATA ERROR = ${error}`);
                actionlog('MOVIE_ACTION SEAT_SELECT END');
            });
};

export const searchMovies = (theaterId, searchTerm) => {
    const options = {
        method: expressEndPointURL.MOVIE_FILTER.method,
        url: `${
            expressEndPointURL.MOVIE_FILTER.url
        }?theater=${theaterId}&search=${searchTerm}`
    };
    return dispatch =>
        AjaxFactoryUtil.triggerServerRequest(options)
            .then(value => {
                const data = value.body && value.body.data;
                dispatch(setMovies(data || []));
                actionlog(`MOVIE_ACTION SEARCH END, DATA = ${JSON.stringify(value)}`);
            })
            .catch(error => {
                actionlog(`HOMEPAGE DATA ERROR = ${error}`);
                actionlog('MOVIE_ACTION SEARCH END');
            });
};

export const getMovieDetail = (params, url, headers, res) => {
    actionlog(`MOVIE_ACTION HOME-PAGE-DATA START URL = ${url}`);
    const options = {
        method: expressEndPointURL.MOVIE_FILTER.method,
        url: `${expressEndPointURL.MOVIE_FILTER.url}?theater=${params.theater}`
    };
    return dispatch =>
        AjaxFactoryUtil.triggerServerRequest(options)
            .then(value => {
                const data = value.body && value.body.data;
                const filterMovie =
                    data && data.filter(movie => movie._id == params.movie);
                dispatch(setActiveMovie(filterMovie));
                dispatch(setActiveTheater(params.theater));
                actionlog(`MOVIE_ACTION DATA END, DATA = ${JSON.stringify(filterMovie)}`);
            })
            .catch(error => {
                actionlog(`HOMEPAGE DATA ERROR = ${error}`);
                actionlog('MOVIE_ACTION DATA END');
            });
};

export const getMovies = (params, url, headers, res) => {
    actionlog(`MOVIE_ACTION HOME-PAGE-DATA START URL = ${url}`);
    const options = {
        method: expressEndPointURL.MOVIE_FILTER.method,
        url: `${expressEndPointURL.MOVIE_FILTER.url}?theater=${params.id}`
    };
    return dispatch =>
        AjaxFactoryUtil.triggerServerRequest(options)
            .then(value => {
                const data = value.body && value.body.data;
                dispatch(setMovies(data || []));
                dispatch(setActiveTheater(params.id));
                actionlog(`MOVIE_ACTION DATA END, DATA = ${JSON.stringify(value)}`);
            })
            .catch(error => {
                actionlog(`HOMEPAGE DATA ERROR = ${error}`);
                actionlog('MOVIE_ACTION DATA END');
            });
};
