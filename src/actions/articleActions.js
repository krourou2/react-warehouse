import * as types from './actionTypes';
import articleApi from '../api/mockArticleApi';
import {beginAjaxCall} from './ajaxStatusActions';

//** ACTION CREATOR**//
export function loadArticlesSuccess(articleList) {
  return { type: types.LOAD_ARTICLES_SUCCESS, articles: articleList };
}

export function updateArticleSuccess(article) {
  return { type: types.UPDATE_ARTICLE_SUCCESS, article};
}

export function createArticleSuccess(article) {
  return { type: types.CREATE_ARTICLE_SUCCESS, article};
}

//** THUNKS AJAX CALLS **//
//** GRABS ARTICLES FROM API END POINT **//
export function loadArticles() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return articleApi.getAllArticles().then(articles => {
      dispatch(loadArticlesSuccess(articles));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveArticle(article) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return articleApi.saveArticle(article).then(savedArticle => {
      article.articleId ? dispatch(updateArticleSuccess(savedArticle)) : dispatch(createArticleSuccess(savedArticle));
    }).catch(error => {
      throw(error);
    });
  };
}

/*
export function deleteArticle(article) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return articleApi.deleteArticle(article).then(deletedArticle => {

    }).catch(error => {
      throw(error);
    });
  };
}
*/
