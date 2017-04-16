import React, {PropTypes} from 'react';
import ArticleListRow from './ArticleListRow';

const ArticleList = ({articles}) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th>UPC</th>
        <th>Article ID</th>
        <th>Manufacturer</th>
        <th>Description</th>
      </tr>
      </thead>
      <tbody>
      {articles.map(article =>
        <ArticleListRow key={article.article_id} article={article}/>
      )}
      </tbody>
    </table>
  );
};

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired
};

export default ArticleList;
