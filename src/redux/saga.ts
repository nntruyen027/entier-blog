import { all } from 'redux-saga/effects';
import locationSaga from '~/redux/location/saga';
import authSaga from '~/redux/auth/saga';
import personalSaga from '~/redux/personal/saga';
import roleSaga from '~/redux/role/saga';
import userSaga from '~/redux/user/saga';
import typeSaga from '~/redux/productType/saga';
import tagSaga from '~/redux/tag/saga';
import brandSaga from '~/redux/brand/saga';
import attributeTypeSaga from '~/redux/attributeType/saga';
import attributeSaga from '~/redux/attribute/saga';
import attributeValueSaga from '~/redux/attributeValue/saga';
import productSaga from '~/redux/product/saga';
import productVersionSaga from '~/redux/productVersion/saga';

export default function* rootSaga() {
  yield all([
    locationSaga(),
    authSaga(),
    personalSaga(),
    roleSaga(),
    userSaga(),
    typeSaga(),
    tagSaga(),
    brandSaga(),
    attributeTypeSaga(),
    attributeSaga(),
    attributeValueSaga(),
    productSaga(),
    productVersionSaga()
  ]);
}
