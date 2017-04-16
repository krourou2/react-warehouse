import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const ArticleListRow = ({article}) => {
  return (
    <tr>
      <td><Link to={'/article/:' + article.article_id}>{article.universal_product_code}</Link></td>
      <td>{article.article_id}</td>
      <td>{article.manufacturer}</td>
      <td>{article.description}</td>
    </tr>
  );
};

ArticleListRow.propTypes = {
  article: React.PropTypes.object.isRequired
};

export default ArticleListRow;
