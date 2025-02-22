import { combineReducers } from 'redux';
import locationReducer from './location/slice';
import authReducer from './auth/slice';
import personalReducer from './personal/slice';
import roleReducer from './role/slice';
import userReducer from './user/slice';
import typeReducer from './productType/slice';
import tagReducer from './tag/slice';
import brandReducer from './brand/slice';
import attributeTypeReducer from './attributeType/slice';
import attributeReducer from './attribute/slice';

const rootReducer = combineReducers({
  location: locationReducer,
  auth: authReducer,
  personal: personalReducer,
  role: roleReducer,
  user: userReducer,
  productType: typeReducer,
  tag: tagReducer,
  brand: brandReducer,
  attributeType: attributeTypeReducer,
  attribute: attributeReducer
});

export default rootReducer;
