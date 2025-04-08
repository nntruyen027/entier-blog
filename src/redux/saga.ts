import { all } from 'redux-saga/effects';
import authSaga from '~/redux/auth/saga';
import roleSaga from '~/redux/role/saga';
import userSaga from '~/redux/user/saga';

export default function* rootSaga() {
  yield all([authSaga(), roleSaga(), userSaga()]);
}
