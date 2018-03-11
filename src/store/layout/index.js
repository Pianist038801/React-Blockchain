import { APP_PREFIX } from 'containers/constants.js'

const SET_EDIT_MODE = `${APP_PREFIX}/LAYOUT/SET_EDIT_MODE`

export const ACTIONS = {
  SET_EDIT_MODE
}

export const setEditMode = (payload) => ({
  type: SET_EDIT_MODE,
  payload
})

const initialState = {
  editMode: false
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_EDIT_MODE:
      return {
        ...state,
        editMode: action.payload
      }
    case '@@router/LOCATION_CHANGE':
      return {
        ...state,
        editMode: false
      }
    default:
      return state
  }
}
