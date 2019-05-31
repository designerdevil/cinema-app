import serviceLocator from '../services/serviceLocator';
import AjaxFactoryUtil from '../../app/utils/ajaxFactoryUtil';

const apiConfig = serviceLocator();

export default (req, res, next) => {
    const defaultReqURLObject = apiConfig.theatre.default;
    const options = {
        method: defaultReqURLObject.method,
        url: defaultReqURLObject.url
    };
    AjaxFactoryUtil.triggerServerRequest(options)
        .then(value => {
            const responseData = value.body && value.body.data;
            res.send(responseData);
        })
        .catch(error => {
            console.log(error);
            res.send(error);
        });
};
