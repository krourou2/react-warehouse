import {ACTIVE_X_OBJECT_NAME} from '../constants/request/requestTypes';
import {SUCCESSFUL} from '../constants/response/statusTypes';
import {NOT_MODIFIED} from '../constants/response/statusCodes';
import RequestStatus from './requestStatus';
class HttpRequest {
    constructor(config) {
        this.ajax = HttpRequest.Initialize();

        this.onLoad(config.promiseHandlers);
        this.onError(config.promiseHandlers);
        this.open(config.methodType, config.resourceUrl);
        this.setRequestHeaders(config.requestHeaders);
        this.send(config.params);
    }
    static Initialize() {
        return window.XMLHttpRequest ?
            new XMLHttpRequest() :
            new ActiveXObject(ACTIVE_X_OBJECT_NAME);
    }
    open(methodType, resourceUrl) {
        this.ajax.open(methodType, resourceUrl, true);
    }
    setRequestHeaders(requestHeaders) {
        requestHeaders.forEach(requestHeader => {
            const {header, value} = requestHeader;
            if(header && value) this.ajax.setRequestHeader(header, value);
        });
    }
    onLoad({resolve, reject}) {
        if(typeof resolve === 'function' && typeof reject === 'function') this.ajax.onload = function() {
            const status = new RequestStatus(this.status);
            console.log("STATUS", status);
            if(status.type === SUCCESSFUL || status.code === NOT_MODIFIED)
                resolve(JSON.parse(this.response));
            else reject({status, description: this.statusText});
        };
    }
    onError({reject}) {
        if(typeof reject === 'function') this.ajax.onerror = function(){
            reject({description: this.statusText});
        }
    }
    send(params){
        if(params) this.ajax.send(this.params);
        else this.ajax.send();
    }
}
export default HttpRequest;
