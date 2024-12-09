import { combineReducers } from 'redux';
import locationReducer from './location/slice';
import authReducer from './auth/slice';

const rootReducer = combineReducers({
  location: locationReducer,
  auth: authReducer
});

export default rootReducer;
