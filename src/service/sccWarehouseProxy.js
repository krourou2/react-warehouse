import HttpProxy from '../http/models/httpProxy';
class SCCWarehouse extends HttpProxy {
    constructor(resource, mapper){
        super('http://localhost:51397/api/' + resource, mapper);
    }
}
export default SCCWarehouse;
