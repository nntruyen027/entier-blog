import { combineReducers } from 'redux';
import locationReducer from './location/slice';
import authReducer from './auth/slice';
import personalReducer from './personal/slice';
import roleReducer from './role/slice';
import userReducer from './user/slice';

const rootReducer = combineReducers({
  location: locationReducer,
  auth: authReducer,
  personal: personalReducer,
  role: roleReducer,
  user: userReducer
});

export default rootReducer;
