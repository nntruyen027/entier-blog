import { combineReducers } from 'redux';
import locationReducer from './location/slice';

const rootReducer = combineReducers({
  location: locationReducer
});

export default rootReducer;
