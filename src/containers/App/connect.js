import { connect } from 'react-redux'
import { setToken, fetchUser, fetchOrganisations } from 'store/auth'
import { fetchReference } from 'store/reference'
import Component from './App.js'

export const mapState = ({ auth }) => ({
  token: auth.token
})

export const mapDispatch = (dispatch) => ({
  fetchUser: () => dispatch(fetchUser()),
  fetchOrganisations: () => dispatch(fetchOrganisations()),
  setToken: (data) => dispatch(setToken(data)),
  fetchReference: () => dispatch(fetchReference())
})

export default connect(mapState, mapDispatch)(Component)
