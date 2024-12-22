import { combineReducers } from 'redux';
import locationReducer from './location/slice';
import authReducer from './auth/slice';
import personalReducer from './personal/slice';

const rootReducer = combineReducers({
  location: locationReducer,
  auth: authReducer,
  personal: personalReducer
});

export default rootReducer;
