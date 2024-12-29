import { combineReducers } from 'redux';
import locationReducer from './location/slice';
import authReducer from './auth/slice';
import personalReducer from './personal/slice';
import roleReducer from './role/slice';

const rootReducer = combineReducers({
  location: locationReducer,
  auth: authReducer,
  personal: personalReducer,
  role: roleReducer
});

export default rootReducer;
