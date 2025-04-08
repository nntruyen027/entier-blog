import { combineReducers } from 'redux';
import authReducer from './auth/slice';
import roleReducer from './role/slice';
import NotiReducer from './noti/slice';
import TagReducer from './tag/slice';

const rootReducer = combineReducers({
  auth: authReducer,
  role: roleReducer,
  noti: NotiReducer,
  tag: TagReducer
});

export default rootReducer;
