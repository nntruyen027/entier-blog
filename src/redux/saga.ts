import { all } from 'redux-saga/effects';
import locationSaga from '~/redux/location/saga';

export default function* rootSaga() {
  yield all([locationSaga()]);
}
