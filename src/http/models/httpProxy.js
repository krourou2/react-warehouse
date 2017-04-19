import HttpPromise from '../../utils/httpPromise';
import StringUtils from '../../utils/stringUtils';
const FORWARD_SLASH = '/';
class HttpProxy {
    url = null;
    constructor(url) {
        this.url = url;
    }
    Get(endpoint, data) {
        return HttpPromise.GET(HttpProxy.combineURL(this.url, endpoint), data)
            .then(response => response.content);
    }
    Post(endpoint, data) {
        return HttpPromise.POST(HttpProxy.combineURL(this.url, endpoint), data)
            .then(response => response.content);
    }
    Put(endpoint, data) {
        return HttpPromise.PUT(HttpProxy.combineURL(this.url, endpoint), data)
            .then(response => response.content);
    }
    Delete(endpoint, data) {
        return HttpPromise.DELETE(HttpProxy.combineURL(this.url, endpoint), data)
            .then(response => response.content);
    }
    static combineURL(url, endpoint) {
        const urlEndpointHaveValue = [url, endpoint].every(StringUtils.hasLength);
        return urlEndpointHaveValue ? [
                StringUtils.trimTrailing(FORWARD_SLASH, url),
                StringUtils.trimLeading(FORWARD_SLASH, endpoint)
            ].join(FORWARD_SLASH) : url;
    }
}
export default HttpProxy;
