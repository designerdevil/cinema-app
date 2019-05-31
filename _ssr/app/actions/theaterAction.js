import AjaxFactoryUtil from 'utils/ajaxFactoryUtil';
import { THEATER, ACTIVE_THEATER } from '../types';
import expressEndPointURL from '../app-constants/express-endpoint-url';
import appConstants from '../app-constants/app-constants';
import { actionlog } from '../../debug';

export const setTheaters = data => ({
    type: THEATER,
    data
});
export const setActiveTheater = data => ({
    type: ACTIVE_THEATER,
    data
});

export const getTheaters = (params, url, headers, res) => {
    actionlog(`THEATER_ACTION HOME-PAGE-DATA START URL = ${url}`);
    const options = {
        method: expressEndPointURL.THEATRE.method,
        url: expressEndPointURL.THEATRE.url
    };

    return dispatch =>
        AjaxFactoryUtil.triggerServerRequest(options)
            .then(value => {
                const data = value.body && value.body.data;
                dispatch(setTheaters(data || []));
                actionlog(`THEATER_ACTION HOME-PAGE-DATA END, DATA = ${JSON.stringify(value)}`);
            })
            .catch(error => {
                actionlog(`HOMEPAGE DATA ERROR = ${error}`);
                actionlog('THEATER_ACTION HOME-PAGE-DATA END');
            });
};
