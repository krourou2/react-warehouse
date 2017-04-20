import SCCWarehouseProxy from './sccWarehouseProxy';

const fromDomainModelToViewModel = article => {
  const {Article_ID, Account_ID, Manufacturer, Description, Universal_Product_Code} = article;
  return {
    articleId: Article_ID,
    accountId: Account_ID.toString(),
    manufacturer: Manufacturer,
    description: Description,
    universalProductCode: Universal_Product_Code
  };
};

class ArticleProxy extends SCCWarehouseProxy {
    constructor() {
        super('Article', fromDomainModelToViewModel);
    }
}
export default new ArticleProxy();
