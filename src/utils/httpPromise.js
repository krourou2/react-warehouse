import HttpRequest from '../http/models/httpRequest';
import Configuration from '../http/models/requestConfiguration';
import {GET, POST, PUT, DELETE} from '../http/constants/request/methods';
import CONTENT_TYPE from '../http/constants/request/headers/contentType';
import X_REQUESTED_WITH from '../http/constants/request/headers/xRequestedWith';
const HttpPromise = {
    GET(url, data) {
        return new Promise((resolve, reject) => {
            const config = new Configuration(url, GET, resolve, reject, data,
                X_REQUESTED_WITH.XML_HTTP_REQUEST);
            return new HttpRequest(config);
        })
    },
    POST(url, data) {
        return new Promise((resolve, reject) => {
           const config = new Configuration(url, POST, resolve, reject, data,
               CONTENT_TYPE.APPLICATION_X_WWW_FORM_URL_ENCODED);
            return new HttpRequest(config);
        });
    },
    PUT(url, data) {
        return new Promise((resolve, reject) => {
            const config = new Configuration(url, PUT, resolve, reject, data,
                X_REQUESTED_WITH.XML_HTTP_REQUEST,
                CONTENT_TYPE.APPLICATION_X_WWW_FORM_URL_ENCODED);
            return new HttpRequest(config);
        });
    },
    DELETE(url, data) {
        return new Promise((resolve, reject) => {
            const config = new Configuration(url, DELETE, resolve, reject, data,
                X_REQUESTED_WITH.XML_HTTP_REQUEST,
                CONTENT_TYPE.APPLICATION_X_WWW_FORM_URL_ENCODED);
            return new HttpRequest(config);
        });
    }
};
export default HttpPromise;
