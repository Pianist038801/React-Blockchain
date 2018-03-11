import { takeEvery, takeLatest, put, all, call } from 'redux-saga/effects'
import { getApiUrl, getApiErrorMessage } from 'containers/constants'
import httpFetch from 'utils/httpFetch'
import { ACTIONS } from '../index'

export function* fetchUser() {
  const url = getApiUrl('user')
  const json = yield httpFetch(url, { method: 'GET' })
  yield put({ type: ACTIONS.SET_USER, payload: json.data })
}

export function* watchFetchUser() {
  yield takeEvery(ACTIONS.FETCH_USER, fetchUser)
}

export function* updateUser({ payload }) {
  const url = getApiUrl('user')
  const json = yield httpFetch(url, {
    method: 'PUT',
    body: JSON.stringify(payload)
  })

  if (json.status === 'success') {
    yield put({ type: ACTIONS.UPDATE_USER_SUCCESS, payload: json.data })
  } else {
    yield put({ type: ACTIONS.UPDATE_USER_ERROR, payload: getApiErrorMessage(json) })
  }
}

export function* watchUpdateUser() {
  yield takeEvery(ACTIONS.UPDATE_USER, updateUser)
}

export function* fetchUserOrganisations() {
  const url = getApiUrl('userAdminOrganisations')
  const json = yield httpFetch(url, { method: 'GET' })
  yield put({ type: ACTIONS.SET_ORGANISATIONS, payload: json.data })
}

export function* watchFetchOrganisation() {
  yield takeLatest(ACTIONS.FETCH_ORGANISATIONS, fetchUserOrganisations)
}

export function* fetchUserActivity() {
  const url = getApiUrl('activity')
  const json = yield httpFetch(url, { method: 'GET' })
  if (json.status === 'success') {
    yield put({ type: ACTIONS.SET_ACTIVITIES, payload: json.data })
  } else {
    yield put({ type: ACTIONS.SET_ACTIVITIES, payload: [] })
  }
}

export function* watchFetchActivity() {
  yield takeLatest(ACTIONS.FETCH_ACTIVITIES, fetchUserActivity)
}

export function* deleteJob({ payload, onSuccess, onError }) {
  const { id } = payload
  const url = `${getApiUrl('userJobs')}/${id}`
  const json = yield httpFetch(url, { method: 'DELETE' })
  if (json.status === 'success') {
    yield put({ type: ACTIONS.DELETE_JOB_SUCCESS, payload: { id } })
    yield call(onSuccess)
  } else {
    yield call(onError)
  }
}

export function* watchDeleteJob() {
  yield takeLatest(ACTIONS.DELETE_JOB, deleteJob)
}

export function* deleteEducation({ payload, onSuccess, onError }) {
  const { id } = payload
  const url = `${getApiUrl('userEducations')}/${id}`
  const json = yield httpFetch(url, { method: 'DELETE' })
  if (json.status === 'success') {
    yield put({ type: ACTIONS.DELETE_EDUCATION_SUCCESS, payload: { id } })
    yield call(onSuccess)
  } else {
    yield call(onError)
  }
}

export function* watchDeleteEducation() {
  yield takeLatest(ACTIONS.DELETE_EDUCATION, deleteEducation)
}

export function* deleteAward({ payload, onSuccess, onError }) {
  const { id, type } = payload
  const url = `${getApiUrl('userAwards')}/${id}`
  const json = yield httpFetch(url, { method: 'DELETE' })
  if (json.status === 'success') {
    yield put({ type: ACTIONS.DELETE_AWARD_SUCCESS, payload: { id, type } })
    yield call(onSuccess)
  } else {
    yield call(onError)
  }
}

export function* watchDeleteAward() {
  yield takeLatest(ACTIONS.DELETE_AWARD, deleteAward)
}

export function* saveAward({ payload, onSuccess, onError }) {
  const url = `${getApiUrl('userAwards')}`
  const json = yield httpFetch(url, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
  const newEntity = {
    ...json.data,
    verified: false,
    verified_status: 'not_verified'
  }
  if (json.status === 'success') {
    yield put({ type: ACTIONS.SAVE_AWARD_SUCCESS, payload: newEntity })
    yield call(onSuccess, json.data)
  } else {
    yield call(onError)
  }
}

export function* watchSaveAward() {
  yield takeLatest(ACTIONS.SAVE_AWARD, saveAward)
}

export function* saveEntity({ payload, onSuccess, onError }) {
  const url = `${getApiUrl(payload.entity_type === 'jobs' ? 'userJobs' : 'userEducations')}`
  delete payload.orgId
  const json = yield httpFetch(url, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
  const newEntity = {
    ...json.data,
    verified: false,
    entity_type: payload.entity_type,
    verified_status: 'not_verified'
  }
  if (json.data.results && typeof (json.data.results)) {
    newEntity.results = JSON.parse(json.data.results)
  }
  if (json.status === 'success') {
    yield put({ type: ACTIONS.SAVE_ENTITY_SUCCESS, payload: newEntity })
    yield call(onSuccess, json.data)
  } else {
    yield call(onError)
  }
}

export function* watchSaveEntity() {
  yield takeLatest(ACTIONS.SAVE_ENTITY, saveEntity)
}

export function* editEntity({ payload, onSuccess, onError }) {
  const data = {...payload}
  const { id, verified, verified_status, entity_type } = data
  const url = `${getApiUrl(entity_type === 'jobs' ? 'userJobs' : 'userEducations')}`
  delete data.id
  delete data.verified_status
  delete data.verified
  delete data.entity_type
  delete data.orgId

  const json = yield httpFetch(`${url}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  })

  const newEntity = {
    ...json.data,
    verified: false,
    entity_type,
    verified_status: 'not_verified'
  }

  if (Object.keys(data).length === 1 && data.visibility) {
    newEntity.verified = verified
    newEntity.verified_status = verified_status
  }

  if (json.status === 'success') {
    yield put({ type: ACTIONS.EDIT_ENTITY_SUCCESS, payload: newEntity })
    yield call(onSuccess, json.data)
  } else {
    yield call(onError)
  }
}

export function* watchEditEntity() {
  yield takeLatest(ACTIONS.EDIT_ENTITY, editEntity)
}

export function* editAward({ payload, onSuccess, onError }) {
  const url = `${getApiUrl('userAwards')}`
  const { id, verified, verified_status } = payload
  delete payload.id
  delete payload.verified_status
  delete payload.verified

  const json = yield httpFetch(`${url}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  })

  const newEntity = {
    ...json.data,
    verified: false,
    verified_status: 'not_verified'
  }

  if (Object.keys(payload).length === 1 && payload.visibility) {
    newEntity.verified = verified
    newEntity.verified_status = verified_status
  }

  if (json.status === 'success') {
    yield put({ type: ACTIONS.EDIT_AWARD_SUCCESS, payload: newEntity })
    yield call(onSuccess, json.data)
  } else {
    yield call(onError)
  }
}

export function* watchEditAward() {
  yield takeLatest(ACTIONS.EDIT_AWARD, editAward)
}

export function* verifyAward(action) {
  const url = `${getApiUrl('verification')}`
  const json = yield httpFetch(url, {
    method: 'POST',
    body: JSON.stringify({ ...action.payload, type: 'award' })
  })
  yield put({
    type: ACTIONS.VERIFY_AWARD_SUCCESS,
    payload: {
      id: json.data.verification.user_award_id,
      verified: false,
      verified_status: 'pending_verification',
      type: action.payload.type
    }
  })
}

export function* watchVerifyAward() {
  yield takeLatest(ACTIONS.VERIFY_AWARD, verifyAward)
}

export function* verifyEntity(action) {
  const url = `${getApiUrl('verification')}`
  const json = yield httpFetch(url, {
    method: 'POST',
    body: JSON.stringify({ ...action.payload, type: action.payload.type === 'jobs' ? 'job' : 'education' })
  })
  yield put({
    type: ACTIONS.VERIFY_ENTITY_SUCCESS,
    payload: {
      id: action.payload.type === 'jobs' ? json.data.verification.job_id : json.data.verification.education_id,
      verified: false,
      verified_status: 'pending_verification',
      entity_type: action.payload.type
    }
  })
}

export function* watchVerifyEntity() {
  yield takeLatest(ACTIONS.VERIFY_ENTITY, verifyEntity)
}

export default function* rootSaga() {
  yield all([
    watchFetchUser(),
    watchFetchOrganisation(),
    watchDeleteJob(),
    watchDeleteEducation(),
    watchDeleteAward(),
    watchSaveAward(),
    watchSaveEntity(),
    watchEditEntity(),
    watchEditAward(),
    watchVerifyAward(),
    watchVerifyEntity(),
    watchUpdateUser(),
    watchFetchActivity()
  ])
}
