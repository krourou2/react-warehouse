import CONTENT_TYPE from '../constants/request/headers/contentType';
import X_REQUESTED_WITH from '../constants/request/headers/xRequestedWith';
export default {
    [CONTENT_TYPE.APPLICATION_X_WWW_FORM_URL_ENCODED]: {header: CONTENT_TYPE.HEADER, value: CONTENT_TYPE.APPLICATION_X_WWW_FORM_URL_ENCODED},
    [X_REQUESTED_WITH.XML_HTTP_REQUEST]: {header: X_REQUESTED_WITH.HEADER, value: X_REQUESTED_WITH.XML_HTTP_REQUEST}
};
