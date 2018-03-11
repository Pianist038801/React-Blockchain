import _assign from 'lodash/assign'
import _find from 'lodash/find'
import _filter from 'lodash/filter'
import { APP_PREFIX, STORAGE_KEY } from 'containers/constants.js'

const LOGIN = `${APP_PREFIX}/auth/LOGIN`
const LOGIN_SUCCESS = `${APP_PREFIX}/auth/LOGIN_SUCCESS`
const LOGIN_FAILED = `${APP_PREFIX}/auth/LOGIN_FAILED`
const SET_TOKEN = `${APP_PREFIX}/auth/SET_TOKEN`
const RESET_TOKEN = `${APP_PREFIX}/auth/RESET_TOKEN`
const SET_USER = `${APP_PREFIX}/auth/SET_USER`
const FETCH_USER = `${APP_PREFIX}/auth/FETCH_USER`
const ADD_USER_AWARD = `${APP_PREFIX}/auth/ADD_USER_AWARD`
const FETCH_ORGANISATIONS = `${APP_PREFIX}/auth/FETCH_ORGANISATIONS`
const SET_ORGANISATIONS = `${APP_PREFIX}/auth/SET_ORGANISATIONS`
const FETCH_USER_PROFILE = `${APP_PREFIX}/auth/FETCH_USER_PROFILE`
const SET_USER_PROFILE = `${APP_PREFIX}/auth/SET_USER_PROFILE`
const DELETE_JOB = `${APP_PREFIX}/auth/DELETE_JOB`
const DELETE_JOB_SUCCESS = `${APP_PREFIX}/auth/DELETE_JOB_SUCCESS`
const DELETE_EDUCATION = `${APP_PREFIX}/auth/DELETE_EDUCATION`
const DELETE_EDUCATION_SUCCESS = `${APP_PREFIX}/auth/DELETE_EDUCATION_SUCCESS`
const DELETE_AWARD = `${APP_PREFIX}/auth/DELETE_AWARD`
const DELETE_AWARD_SUCCESS = `${APP_PREFIX}/auth/DELETE_AWARD_SUCCESS`
const SAVE_AWARD = `${APP_PREFIX}/auth/SAVE_AWARD`
const SAVE_AWARD_SUCCESS = `${APP_PREFIX}/auth/SAVE_AWARD_SUCCESS`
const SAVE_ENTITY = `${APP_PREFIX}/profile/SAVE_ENTITY`
const SAVE_ENTITY_SUCCESS = `${APP_PREFIX}/profile/SAVE_ENTITY_SUCCESS`
const EDIT_ENTITY = `${APP_PREFIX}/profile/EDIT_ENTITY`
const EDIT_ENTITY_SUCCESS = `${APP_PREFIX}/profile/EDIT_ENTITY_SUCCESS`
const EDIT_AWARD = `${APP_PREFIX}/profile/EDIT_AWARD`
const EDIT_AWARD_SUCCESS = `${APP_PREFIX}/profile/EDIT_AWARD_SUCCESS`
const VERIFY_AWARD = `${APP_PREFIX}/profile/VERIFY_AWARD`
const VERIFY_AWARD_SUCCESS = `${APP_PREFIX}/profile/VERIFY_AWARD_SUCCESS`
const VERIFY_ENTITY = `${APP_PREFIX}/profile/VERIFY_ENTITY`
const VERIFY_ENTITY_SUCCESS = `${APP_PREFIX}/profile/VERIFY_ENTITY_SUCCESS`
const UPDATE_USER = `${APP_PREFIX}/profile/UPDATE_USER`
const UPDATE_USER_SUCCESS = `${APP_PREFIX}/profile/UPDATE_USER_SUCCESS`
const UPDATE_USER_ERROR = `${APP_PREFIX}/profile/UPDATE_USER_ERROR`
const FETCH_ACTIVITIES = `${APP_PREFIX}/auth/FETCH_ACTIVITIES`
const SET_ACTIVITIES = `${APP_PREFIX}/auth/SET_ACTIVITIES`

export const ACTIONS = {
  LOGIN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  SET_TOKEN,
  RESET_TOKEN,
  SET_USER,
  FETCH_USER,
  FETCH_USER_PROFILE,
  SET_USER_PROFILE,
  FETCH_ORGANISATIONS,
  SET_ORGANISATIONS,
  ADD_USER_AWARD,
  DELETE_JOB,
  DELETE_JOB_SUCCESS,
  DELETE_EDUCATION,
  DELETE_EDUCATION_SUCCESS,
  DELETE_AWARD,
  DELETE_AWARD_SUCCESS,
  SAVE_AWARD,
  SAVE_AWARD_SUCCESS,
  SAVE_ENTITY,
  SAVE_ENTITY_SUCCESS,
  EDIT_ENTITY,
  EDIT_ENTITY_SUCCESS,
  EDIT_AWARD,
  EDIT_AWARD_SUCCESS,
  VERIFY_AWARD,
  VERIFY_AWARD_SUCCESS,
  VERIFY_ENTITY,
  VERIFY_ENTITY_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  FETCH_ACTIVITIES,
  SET_ACTIVITIES
}

// Action Creators
export const loginFailed = () => ({
  type: LOGIN_FAILED,
  error: 'Unable to sign in. Please check credentials and try again.'
})

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS
})

export const fetchOrganisations = () => ({
  type: FETCH_ORGANISATIONS
})

export const fetchActivities = () => ({
  type: FETCH_ACTIVITIES
})

export const fetchUserProfile = () => ({
  type: FETCH_USER_PROFILE
})

export const addAward = () => ({
  type: ADD_USER_AWARD
})

export const fetchUser = () => ({
  type: FETCH_USER
})

export const updateUserProfile = (payload) => ({
  type: UPDATE_USER,
  payload
})

export const setUser = (payload) => ({
  type: SET_USER,
  payload
})

export const setToken = (payload) => ({
  type: SET_TOKEN,
  payload
})

export const resetToken = () => {
  window.localStorage.setItem(STORAGE_KEY.token, null)
  window.localStorage.setItem(STORAGE_KEY.appBanner, null)
  return ({
    type: RESET_TOKEN
  })
}

export const deleteJob = (payload, onSuccess, onError) => ({
  type: DELETE_JOB,
  payload,
  onSuccess,
  onError
})

export const deleteEducation = (payload, onSuccess, onError) => ({
  type: DELETE_EDUCATION,
  payload,
  onSuccess,
  onError
})

export const deleteAward = (payload, onSuccess, onError) => ({
  type: DELETE_AWARD,
  payload,
  onSuccess,
  onError
})

export const saveAward = (payload, onSuccess, onError) => ({
  type: SAVE_AWARD,
  payload,
  onSuccess,
  onError
})

export const saveEntity = (payload, onSuccess, onError) => ({
  type: SAVE_ENTITY,
  payload,
  onSuccess,
  onError
})

export const editEntity = (payload, onSuccess, onError) => ({
  type: EDIT_ENTITY,
  payload,
  onSuccess,
  onError
})

export const editAward = (payload, onSuccess, onError) => ({
  type: EDIT_AWARD,
  payload,
  onSuccess,
  onError
})

export const verifyAward = (payload) => ({
  type: VERIFY_AWARD,
  payload
})

export const verifyEntity = (payload) => ({
  type: VERIFY_ENTITY,
  payload
})

export function isLoaded(globalState) {
  return !!(globalState.auth && globalState.auth.token !== null)
}

export function isUserLoaded(globalState) {
  return !!(globalState.auth &&
    globalState.auth.token !== null &&
    globalState.auth.user !== null
  )
}

export function belongsToOrg(globalState, orgId) {
  const organisations = (globalState.auth) ? globalState.auth.organisations : []
  return !!_find(organisations, {id: orgId})
}

const mergeArray = function(list, payload) {
  if (list.length === 0) {
    return [payload]
  }

  var newArray = list.map((item) => {
    return (item.id === payload.id) ? {...item, ...payload} : item
  })

  const found = _find(newArray, { id: payload.id })
  if (typeof found === 'undefined') {
    newArray.push(payload)
  }

  return newArray
}

const initialState = {
  pending: false,
  token: null,
  saveErrorMsg: null,
  error: '',
  organisations: [],
  allAwards: {
    award: [],
    cpd:[],
    certificate: [],
    achievement: [],
    skill: [],
    language: [],
    project: []
  },
  educations: [],
  jobs: [],
  activities: []
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_USER_PROFILE:
    case FETCH_ORGANISATIONS:
      return {
        ...state,
        pending: true
      }
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload.token
      }
    case RESET_TOKEN:
      return _assign({}, initialState)
    case SET_USER:
      return {
        ...state,
        user: {
          ...action.payload
        }
      }
    case UPDATE_USER:
      return {
        ...state,
        saveErrorMsg: null,
        pending: true
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: {
          ...action.payload
        },
        pending: false
      }
    case UPDATE_USER_ERROR:
      return {
        ...state,
        saveErrorMsg: action.payload,
        pending: false
      }
    case SET_ORGANISATIONS:
      return {
        ...state,
        organisations: action.payload.organisations,
        pending: false
      }
    case SET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
        pending: false
      }
    case SET_USER_PROFILE:
      return {
        ...state,
        pending: false,
        user: {
          ...action.payload.user
        },
        allAwards: {
          ...state.allAwards,
          ...action.payload.allAwards
        },
        educations: action.payload.educations,
        jobs: action.payload.jobs
      }
    case LOGIN:
      return {
        ...state,
        error: '',
        pending: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        error: '',
        pending: false
      }
    case LOGIN_FAILED:
      return {
        ...state,
        pending: false,
        token: null,
        user: null,
        error: action.error
      }
    case DELETE_JOB_SUCCESS:
      return {
        ...state,
        jobs: _filter(state.jobs, function(job) {
          return job.id !== action.payload.id
        })
      }
    case DELETE_EDUCATION_SUCCESS:
      return {
        ...state,
        educations: _filter(state.educations, function(item) {
          return item.id !== action.payload.id
        })
      }
    case DELETE_AWARD_SUCCESS:
      return {
        ...state,
        allAwards: {
          ...state.allAwards,
          [action.payload.type]: _filter(state.allAwards[action.payload.type], function(item) {
            return item.id !== action.payload.id
          })
        }
      }
    case SAVE_AWARD_SUCCESS:
    case EDIT_AWARD_SUCCESS:
    case VERIFY_AWARD_SUCCESS:
      return {
        ...state,
        allAwards: {
          ...state.allAwards,
          [action.payload.type]: mergeArray(state.allAwards[action.payload.type], action.payload)
        }
      }
    case SAVE_ENTITY_SUCCESS:
    case EDIT_ENTITY_SUCCESS:
    case VERIFY_ENTITY_SUCCESS:
      return {
        ...state,
        [action.payload.entity_type]: mergeArray(state[action.payload.entity_type], action.payload)
      }
    default:
      return state
  }
}
