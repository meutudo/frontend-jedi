import { takeEvery, put, call } from 'redux-saga/effects';
import { ui } from '../modules';

function* dispatchRequest({ payload }) {
  yield put(ui.actions.toggleLoading());
  const result = yield call(payload.fetch, payload.args);
  if (result) {
    yield put(ui.actions.toggleLoading());
    yield put(payload.callBack(result));
  }
}

function* watchRequests() {
  yield takeEvery('fetch/REQUESTED', dispatchRequest);
}

export default watchRequests;
