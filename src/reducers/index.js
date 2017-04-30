import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import articles from './articleReducer';
import warehouses from './warehouseReducer';
import locations from './locationReducer';
import locationTags from './locationTagReducer';
import inventories from './inventoryReducer';
import users from './userReducer';
import activeUser from './activeUserReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  courses: courses,
  inventories: inventories,
  authors: authors,
  articles: articles,
  warehouses: warehouses,
  locations: locations,
  locationTags: locationTags,
  users: users,
  activeUser: activeUser,
  ajaxCallsInProgress: ajaxCallsInProgress
});

export default rootReducer;
