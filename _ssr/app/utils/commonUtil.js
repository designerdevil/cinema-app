import axios from 'axios';
import lodash from 'lodash';
import imageConfig from '../../server/config/image-config.json';
import appConstants from '../app-constants/app-constants';

const commonUtil = {
    createContentMarkup(description) {
        return { __html: description };
    },
    /**
     * This is replacement to node.closest('.class name')
     * findClosetElement find the closeset parent of an element
     * @param {el obj} current html element
     * @param {cls string} class of current element
     */
    findClosestElement(el, cls) {
        while (el.parentElement) {
            if (el.parentElement.className.indexOf(cls) !== -1) {
                el = el.parentElement;
                break;
            }
            el = el.parentElement;
        }
        return el;
    },
    /**
     * [getImagePath return original image path if the image exist else return fallback image]
     * @param  {[string]} imagePath [The path of image]
     * @return {[string]}           [Working image path]
     */
    getImagePath(imagePath) {
        const fallbackImagePath = imageConfig.fallbackImage.imagePath;
        if (typeof window === 'undefined') {
            return fallbackImagePath;
        }
        const img = new Image();
        img.src = imagePath;
        if (img.height !== 0) {
            return imagePath;
        }
        return fallbackImagePath;
    },
    /**
     * [parseQueryString get all query parameters in key value format]
     * @param  {[string]} url [url string of query parameters]
     * @return {[json object]}     [json object in key value format]
     * /^.*\?/
     * /([^\=]+)\=([^\&]*)\&?/g
     */
    parseQueryString(url) {
        // parse query string into key/value pairs and return as object
        const query = {};
        let value;
        if (!url) {
            return '';
        }
        url = url
            .replace(/^.*\?/, '')
            .replace(/([^=]+)=([^&]*)&?/g, (match, key, value) => {
                value = decodeURIComponent(value);
                value = value.split('|');
                query[key] = value;
                return '';
            });
        return query;
    },
    parseCookies(cookie) {
        const list = {};
        const rc = cookie;
        rc.split(';').forEach((cookie) => {
            const parts = cookie.split('=');
            list[parts.shift().trim()] = decodeURI(parts.join('='));
        });
        return list;
    },
    setCookie(cname, cvalue, expiredays) {
        const d = new Date();
        d.setTime(d.getTime() + expiredays * 24 * 60 * 60 * 1000);
        const expires = `expires=${d.toUTCString()}`;
        if (typeof document === 'undefined') {
            return null;
        }
        document.cookie = `${cname}=${cvalue};${expires};path=/`;
        return document.cookie;
    },
    mapValues(identifier, replaceStr, obj) {
        return lodash.mapValues(obj, (val, key) => {
            if (val instanceof Array) {
                return val.map(item =>
                    this.mapValues(identifier, replaceStr, item));
            }
            return val.replace(new RegExp(identifier, 'g'), replaceStr);
        });
    }
};
export default commonUtil;
