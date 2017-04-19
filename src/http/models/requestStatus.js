import {getStatusClass, StatusClassHandler} from '../handlers/statusTypeHandler';
import StatusCodeHandler from '../handlers/statusCodeHandler';
class RequestStatus {
    code = null;
    type = null;
    text = null;
    constructor(status) {
        this.code = status;
        this.type = StatusClassHandler[getStatusClass(status)];
        this.text = StatusCodeHandler[status];
    }
}
export default RequestStatus;
