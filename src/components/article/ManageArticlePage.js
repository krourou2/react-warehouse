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
    this.deleteArticle = this.deleteArticle.bind(this);
  }

  // ran every once in a while to check if props have changed
  componentWillReceiveProps(nextProps) {
    if (this.props.article.articleId != nextProps.article.articleId) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({article: Object.assign({}, nextProps.article)});
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

  deleteArticle(event) {
    event.preventDefault();
    this.setState({ saving: true });
    this.props.actions.deleteArticle(this.state.article)
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
        onDelete={this.deleteArticle}
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

// function getArticleById(articles, id) {
//   const article = articles.filter(article => article.articleId == id);
//   if (article.length) return article[0]; //since filter returns an array, have to grab the first.
//   return null;
// }

function mapStateToProps(state, ownProps) {
  let articleId, article;

  if (ownProps.params.id && state.articles.find(article => article.articleId === ownProps.params.id.replace(":",""))){
    console.log("1");
    articleId = ownProps.params.id.replace(":",""); // from the path '/course/:id'
    article = state.articles.find(article => article.articleId === articleId);
  } else {
    console.log("2");
    articleId = parseInt(state.articles[state.articles.length - 1].articleId ) + 1;
    article = {articleId: articleId.toString(), accountId: state.activeUser[0].accountId, manufacturer: '', description: '', universalProductCode: ''};
  }

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
