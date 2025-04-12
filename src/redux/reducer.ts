import { combineReducers } from 'redux';
import authReducer from './auth/slice';
import roleReducer from './role/slice';
import NotiReducer from './noti/slice';
import TagReducer from './tag/slice';
import ParamReducer from './param/slice';
import userReducer from './user/slice';
import postReducer from './post/slice';

const rootReducer = combineReducers({
  auth: authReducer,
  role: roleReducer,
  noti: NotiReducer,
  tag: TagReducer,
  param: ParamReducer,
  user: userReducer,
  post: postReducer
});

export default rootReducer;
