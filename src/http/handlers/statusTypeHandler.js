import {INFORMATION, SUCCESSFUL, REDIRECTION, CLIENT_ERROR, SERVER_ERROR} from '../constants/response/statusTypes';
export const StatusClassHandler = {
    '1XX': INFORMATION,
    '2XX': SUCCESSFUL,
    '3XX': REDIRECTION,
    '4XX': CLIENT_ERROR,
    '5XX': SERVER_ERROR
};
export const getStatusClass = statusCode => Math.floor(statusCode/100) + "XX" || null;
export default code => StatusClassHandler[getStatusClass(code)];
