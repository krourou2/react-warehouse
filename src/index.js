/* eslint-disable no-console */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import {loadAuthors} from './actions/authorActions';
import {loadCourses} from './actions/courseActions'; // IMPORT LOADCOURSES FUNCTION FROM COURSESACTIONS TO TELL APP TO LOAD COURSES ON ENTRY
import {loadUsers} from './actions/userActions';
import {loadArticles} from './actions/articleActions';
import {loadWarehouses} from './actions/warehouseActions';
import {loadLocations} from './actions/locationActions';
import {loadInventories} from './actions/inventoryActions';
import './styles/styles.css'; //Webpack can import CSS files too!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const store =  configureStore();
store.dispatch(loadCourses());
store.dispatch(loadAuthors());
store.dispatch(loadArticles());
store.dispatch(loadWarehouses());
store.dispatch(loadLocations());
store.dispatch(loadInventories());
store.dispatch(loadUsers());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
