import { combineReducers } from 'redux';
import authReducer from './auth/slice';
import roleReducer from './role/slice';
import NotiReducer from './noti/slice';
import TagReducer from './tag/slice';
import ParamReducer from './param/slice';
import userReducer from './user/slice';
import postReducer from './post/slice';
import contactTypeReducer from './contactType/slice';
import contactReducer from './contact/slice';
import productReducer from './product/slice';
import productTypeReducer from './productType/slice';

const rootReducer = combineReducers({
  auth: authReducer,
  role: roleReducer,
  noti: NotiReducer,
  tag: TagReducer,
  param: ParamReducer,
  user: userReducer,
  post: postReducer,
  contactType: contactTypeReducer,
  contact: contactReducer,
  product: productReducer,
  productType: productTypeReducer
});

export default rootReducer;
