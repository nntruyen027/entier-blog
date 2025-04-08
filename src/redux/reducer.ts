import { combineReducers } from 'redux';
import authReducer from './auth/slice';
import roleReducer from './role/slice';
import userReducer from './user/slice';
import NotiReducer from './noti/slice';

const rootReducer = combineReducers({
  auth: authReducer,
  role: roleReducer,
  user: userReducer,
  noti: NotiReducer
});

export default rootReducer;
