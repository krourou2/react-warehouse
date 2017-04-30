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
import ManageInventoryPage from './components/inventory/ManageInventoryPage';
import ManageLocationPage from './components/location/ManageLocationPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="about" component={AboutPage} />
    <Route path="courses" component={CoursesPage} />
    <Route path="course/manage/" component={ManageCoursePage} />
    <Route path="course/manage/:id" component={ManageCoursePage} />
    <Route path="inventory" component={InventoryPage}/>
    <Route path="inventory/manage/" component={ManageInventoryPage}/>
    <Route path="inventory/manage/:id" component={ManageInventoryPage}/>
    <Route path="articles" component={ArticlesPage}/>
    <Route path="article/manage/" component={ManageArticlesPage}/>
    <Route path="article/manage/:id" component={ManageArticlesPage}/>
    <Route path="warehouses" component={WarehousesPage}/>
    <Route path="warehouse/manage/" component={ManageWarehousePage}/>
    <Route path="warehouse/manage/:id" component={ManageWarehousePage} />
    <Route path="warehouse/inventory/:id" component={InventoryPage} />
    <Route path="locations/:id" component={LocationsPage}/>
    <Route path="location/manage/" component={ManageLocationPage}/>
    <Route path="location/manage/:id" component={ManageLocationPage}/>
  </Route>
);
