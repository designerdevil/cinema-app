import axios from 'axios';
import commonUtil from './commonUtil';
import Event from './Events';
import * as types from '../types';

const AjaxFactoryUtil = {
    /**
     * [triggerServerRequest Initiate the ajax call and return the data object]
     * @param  {[type]} options [All the data to be sent to server. The formate of options is below]
     * {
     *   method: 'GET',
     *   url: URL,
     *   params: {
     *     param1: 'x'
     *   }
     * };
     * @return {[type]} [It return the data object]
     */
    triggerServerRequest(options) {
        const startTime = new Date().getTime();
        // console.log({req: options}, ':::::AjaxFactoryUtil Triggering Server request', options.url);
        Event.publish(types.AJAX_STARTED);
        const data = options.body;
        return new Promise((resolve, reject) => {
            const config = {
                method: options.method,
                url: options.url,
                json: true,
                headers: options.header,
                data
            };

            if (!options.headers) {
                delete options.headers;
            }
            if (!data) {
                delete config.data;
            }
            Object.assign(config, options);
            axios(config).then(
                response => {
                    Event.publish(types.AJAX_COMPLETED);
                    const endTime = new Date().getTime();
                    const delta = endTime - startTime;
                    if (delta > 500) {
                        // console.log({req: config}, 'ALERT!!! AjaxFactoryUtil call for ', config.url, ' params : ', JSON.stringify(config.params), ' took : ', (endTime - startTime), ' milliseconds');
                    }
                    if (response.data) {
                        const responseObject = {
                            data: response.data
                        };
                        if (
                            !Object.prototype.hasOwnProperty.call(
                                response.data,
                                'errorCode'
                            )
                        ) {
                            responseObject.ajaxRequestStatus = 'success';
                        } else {
                            responseObject.ajaxRequestStatus = 'failure';
                            //    todo need to test
                            return reject(new Error('failure'), {
                                body: responseObject
                            });
                        }
                        return resolve({
                            body: responseObject
                        });
                    } else if (response && response.status === 204) {
                        return resolve({
                            body: response.status
                        });
                    }
                    return reject(new Error('failure'), {
                        body: 'ERROR'
                    });
                },
                error => {
                    console.error(`AJAX error URL=${error}`);
                    // Return the error object to display call failure message
                    const responseObject = {
                        ajaxRequestStatus: 'failure',
                        errorCode:
                            error && (error.response && error.response.status),
                        errorData:
                            (error &&
                                (error.response && error.response.data)) ||
                            null
                    };
                    return reject(new Error('failure'), {
                        body: 'ERROR'
                    });
                }
            );
        });
    }
};
export default AjaxFactoryUtil;
