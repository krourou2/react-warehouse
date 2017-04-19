import HttpProxy from '../http/models/httpProxy';
class SCCWarehouse extends HttpProxy {
    constructor(resource){
        super('http://localhost:51397/api/' + resource);
    }
}
export default SCCWarehouse;
