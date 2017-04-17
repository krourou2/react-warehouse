import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function articleReducer(state = initialState.articles, action){
  switch (action.type) {
    case types.LOAD_ARTICLES_SUCCESS:
      return action.articles;

    case types.UPDATE_ARTICLE_SUCCESS:
      return [
        ...state.filter(article => article.articleId !== action.article.articleId),
        Object.assign({}, action.article)
      ];

    case types.CREATE_ARTICLE_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.article)
      ];

    default:
      return state;
  }
}
