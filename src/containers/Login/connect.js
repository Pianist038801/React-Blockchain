import { connect } from 'react-redux'
import {
  setToken, fetchOrganisations,
  loginSuccess, loginFailed
} from 'store/auth'
import { fetchReference } from 'store/reference'
import Component from './Login.js'

export const mapState = ({ auth }) => ({
  auth
})

export const mapDispatch = (dispatch) => ({
  fetchOrganisations: () => dispatch(fetchOrganisations()),
  fetchReference: () => dispatch(fetchReference()),
  loginSuccess: () => dispatch(loginSuccess()),
  loginFailed: () => dispatch(loginFailed()),
  setToken: (data) => dispatch(setToken(data))
})

export default connect(mapState, mapDispatch)(Component)
