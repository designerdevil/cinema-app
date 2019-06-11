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
                    console.log(JSON.stringify(config));
                    console.error('=======> AJAX error URL <=====');
                    console.log(error);
                    return reject(new Error('failure'), {
                        body: 'ERROR'
                    });
                }
            );
        });
    }
};
export default AjaxFactoryUtil;
