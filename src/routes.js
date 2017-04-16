import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/course/CoursesPage';
import ManageCoursePage from './components/course/ManageCoursePage';
import ArticlesPage from './components/article/ArticlesPage';
import ManageArticlesPage from './components/article/ManageArticlePage';
import WarehousesPage from './components/warehouse/WarehousesPage';
import ManageWarehousePage from './components/warehouse/ManageWarehousePage';
import LocationsPage from './components/location/LocationsPage';
import InventoryPage from './components/inventory/InventoryPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="about" component={AboutPage} />
    <Route path="courses" component={CoursesPage} />
    <Route path="course" component={ManageCoursePage} />
    <Route path="course/:id" component={ManageCoursePage} />
    <Route path="inventory" component={InventoryPage}/>
    <Route path="articles" component={ArticlesPage}/>
    <Route path="article" component={ManageArticlesPage}/>
    <Route path="article/:id" component={ManageArticlesPage}/>
    <Route path="warehouses" component={WarehousesPage}/>
    <Route path="warehouse/:id" component={ManageWarehousePage} />
    <Route path="locations" component={LocationsPage}/>
  </Route>
);
