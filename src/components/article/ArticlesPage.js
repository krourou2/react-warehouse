import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import ArticleList from './ArticleList';
import {browserHistory} from 'react-router';

class ArticlesPage extends React.Component {

  //** CONSTRUCTOR INITIALIZES STATE AND CALLS BIND FUNCTIONS **//
  constructor(props, context){
    super(props, context);
    this.redirectToAddArticlePage = this.redirectToAddArticlePage.bind();
  }

  redirectToAddArticlePage() {
    browserHistory.push('/article/manage/');
  }

  render() {
    const {articles} = this.props;

    return(
      <div>
        <h1>Articles</h1>
        <input
          type="submit"
          value="Create Article"
          className="btn btn-primary"
          onClick={this.redirectToAddArticlePage} />
        <ArticleList articles={articles}/>
      </div>
    );
  }
}

//** PROP TYPE VALIDATION **//
ArticlesPage.propTypes = {
  articles: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired
};

//** what part of state is going to be exposed to props **//
function mapStateToProps(state, ownProps) {

  const articlesByAccountId = state.articles.filter(article => article.accountId === state.activeUser[0].accountId);

  return {
    articles: articlesByAccountId
    //articles: state.articles
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesPage);
