import { all } from 'redux-saga/effects';
import authSaga from '~/redux/auth/saga';
import roleSaga from '~/redux/role/saga';
import tagSaga from '~/redux/tag/saga';
import paramSaga from '~/redux/param/saga';
import userSaga from '~/redux/user/saga';
import postSaga from '~/redux/post/saga';
import contactTypeSaga from '~/redux/contactType/saga';
import contactSaga from '~/redux/contact/saga';

export default function* rootSaga() {
  yield all([authSaga(), roleSaga(), tagSaga(), paramSaga(), userSaga(), postSaga(), contactTypeSaga(), contactSaga()]);
}
