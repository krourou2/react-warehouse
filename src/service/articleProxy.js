import SCCWarehouseProxy from './sccWarehouseProxy';
class ArticleProxy extends SCCWarehouseProxy {
    constructor() {
        super('Article');
    }
}
export default new ArticleProxy();
