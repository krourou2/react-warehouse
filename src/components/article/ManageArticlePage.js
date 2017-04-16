import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as articleActions from '../../actions/articleActions';
import ArticleForm from './ArticleForm';

class ManageArticlePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      article: Object.assign({}, this.props.article),
      errors: {},
      saving: false
    };

    this.updateArticleState = this.updateArticleState.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
  }

  // ran every once in a while to check if props have changed
  componentWillReceiveProps(nextProps) {
    if (this.props.article.article_id != nextProps.article.article_id) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({course: Object.assign({}, nextProps.article)});
    }
  }

  updateArticleState(event) {
    const field = event.target.name;
    let article = this.state.article;
    article[field] = event.target.value;
    return this.setState({article: article});
  }

  saveArticle(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.saveArticle(this.state.article)
      .then( () => this.redirect() );
  }

  redirect() {
    this.setState({saving: false});
    this.context.router.push('/articles');
  }

  render() {
    return (
      <ArticleForm
        onChange={this.updateArticleState}
        onSave={this.saveArticle}
        article={this.state.article}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageArticlePage.propTypes = {
  article: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router
ManageArticlePage.contextTypes = {
  router: PropTypes.object
};

function getArticleById(articles, id) {
  const article = articles.filter(article => article.article_id == id);
  if (article.length) return article[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const articleId = ownProps.params.id.replace(":",""); // from the path '/course/:id'

  let article = {article_id: '', account_id: '', manufacturer: '', description: '', universal_product_code: ''};

  if (articleId && state.courses.length > 0) {
    article = getArticleById(state.articles, articleId);
  }

  /*
  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });
  */

  return {
    article: article
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(articleActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageArticlePage);
