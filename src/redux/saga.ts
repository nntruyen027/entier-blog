import { all } from 'redux-saga/effects';
import authSaga from '~/redux/auth/saga';
import roleSaga from '~/redux/role/saga';
import tagSaga from '~/redux/tag/saga';

export default function* rootSaga() {
  yield all([authSaga(), roleSaga(), tagSaga()]);
}
