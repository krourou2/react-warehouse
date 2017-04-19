import STATUS_CODES from '../constants/response/statusCodes';
export default Object.assign(...Object.keys(STATUS_CODES)
    .map(response => ({
        [STATUS_CODES[response]]: response
    }))
);
