import { connect } from 'react-redux'
import { fetchUserSettings, changePassword, saveUserSettings, deleteUserAccount } from './reducer'
import { updateUserProfile } from 'store/auth'
import Component from './SettingsAccount.js'

export const mapState = ({ auth, userSettings }) => ({
  user: auth.user,
  saveErrorMsg: auth.saveErrorMsg,
  pending: auth.pending,
  userSettings
})

export const mapDispatch = (dispatch) => ({
  fetchUserSettings: () => dispatch(fetchUserSettings()),
  deleteUserAccount: () => dispatch(deleteUserAccount()),
  changePassword: (data) => dispatch(changePassword(data)),
  saveUserSettings: (data) => dispatch(saveUserSettings(data)),
  updateUserProfile: (data) => dispatch(updateUserProfile(data))
})

export default connect(mapState, mapDispatch)(Component)
