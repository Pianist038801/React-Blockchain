import { takeEvery, put, all } from 'redux-saga/effects'
import { getApiUrl } from 'containers/constants'
import httpFetch from 'utils/httpFetch'
import { ACTIONS } from '../index'

export function* saveStorage({ payload }) {
  const url = getApiUrl('storage')
  const json = yield httpFetch(url, {
    method: 'POST',
    body: JSON.stringify(payload)
  })

  if (json.status === 'success') {
    yield put({ type: ACTIONS.SAVE_SUCCESS })
  } else {
    yield put({ type: ACTIONS.SAVE_ERROR })
  }
}

export function* watchSaveStorage() {
  yield takeEvery(ACTIONS.SAVE, saveStorage)
}

export default function* rootSaga() {
  yield all([
    watchSaveStorage()
  ])
}
