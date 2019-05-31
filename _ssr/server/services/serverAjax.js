import axios from 'axios';

const serverAjax = {
    /**
     *  params: object or array that will have all the data of each api's
     *  iterates though each req object and pass this to promise
     *  {
     *   method: 'GET',
     *   url: URL,
     *   params: {
     *     param1: 'x'
     *  },
     *  "tokenReq": true
     *
     * */

    triggerAggregatorRequest(params) {
        const isArr =
            Object.prototype.toString.call(params) == '[object Array]';
        return new Promise((resolve, reject) => {
            if (!isArr) {
                // type is object
                const arrApiAggregator = [];
                for (const _obj in params) {
                    const _promise = (api) => {
                        const options = {};
                        options.method = api.method || '';
                        options.url = api.url || '';
                        options.params = api.params || '';
                        options.data = api.data || '';
                        options.httpsAgent = api.httpsAgent || '';
                        return axios(options);
                    };
                    arrApiAggregator.push(_promise(params[_obj]));
                }
                axios
                    .all(arrApiAggregator)
                    .then(axios.spread((...param) => {
                        // Both requests are now complete
                        if (param) {
                            return resolve({
                                status: 'success',
                                param
                            });
                        }
                        return reject(new Error('failure'), {
                            body: 'error'
                        });
                    }))
                    .catch((err) => {
                        const responseObject = {
                            status: 'failure',
                            data: err
                        };
                        return reject(new Error('failure'), {
                            body: responseObject
                        });
                    });
            }
        });
    }
};
export default serverAjax;
