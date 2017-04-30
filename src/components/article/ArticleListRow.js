import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const ArticleListRow = ({article}) => {
  return (
    <tr>
      <td><Link to={'/article/manage/:' + article.articleId}>{article.universalProductCode}</Link></td>
      <td>{article.manufacturer}</td>
      <td>{article.description}</td>
    </tr>
  );
};

ArticleListRow.propTypes = {
  article: React.PropTypes.object.isRequired
};

export default ArticleListRow;
