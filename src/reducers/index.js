import { combineReducers } from "redux";
import shop from './shop'
import location from './location'
import search from './search'
import category from './category'
import errorReducer from './errorReducer'


const rootReducer = combineReducers({
  shop,
  location,
  search,
  category,
  errorReducer
});

export default rootReducer;
