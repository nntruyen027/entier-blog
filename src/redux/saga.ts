import { all } from 'redux-saga/effects';
import locationSaga from '~/redux/location/saga';
import authSaga from '~/redux/auth/saga';
import personalSaga from '~/redux/personal/saga';

export default function* rootSaga() {
  yield all([locationSaga(), authSaga(), personalSaga()]);
}
