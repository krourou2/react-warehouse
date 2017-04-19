import RequestHeaderHandler from '../handlers/requestHeaderHandler';
class RequestConfiguration {
    constructor(resourceUrl, methodType, resolve, reject, data, ...requestHeaderValues) {
        this.resourceUrl = resourceUrl;
        this.methodType = methodType;
        this.params = RequestConfiguration.fromObjectDataToParameters(data);
        this.promiseHandlers = {resolve, reject};
        this.requestHeaders = RequestConfiguration.fromHeaderValuesToHeaderValuePairs(requestHeaderValues);
    }
    static fromHeaderValuesToHeaderValuePairs(requestHeaderValues) {
        const headers = [];
        if(Array.isArray(requestHeaderValues) && requestHeaderValues.length > 0)
            requestHeaderValues.forEach(requestHeaderValue => {
                const {header, value} = RequestHeaderHandler[requestHeaderValue] || null;
                if (header && value) headers.push({header, value});
            });
        return headers;
    }
    static fromObjectDataToParameters(data) {
        if(data) return typeof data === "string" ? data :
            Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
        return null;
    }
}
export default RequestConfiguration;
