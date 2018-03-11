import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import people from 'containers/People/reducer'
import profileOrganisation from 'containers/ProfileOrganisation/reducer'
import organisations from 'containers/Organisations/reducer'
import userVerifications from 'containers/UserVerifications/reducer'
import orgVerifications from 'containers/OrgVerifications/reducer'
import orgAccreditations from 'containers/OrgAccreditations/reducer'
import orgAccreditation from 'containers/OrgAccreditationQRCode/reducer'
import orgAdmins from 'containers/OrgAdmins/reducer'
import userSettings from 'containers/SettingsAccount/reducer'
import userProfile from './userProfile'
import auth from './auth'
import reference from './reference'
import storage from './storage'
import navigation from './navigation'
import layout from './layout'

const reducers = combineReducers({
  auth,
  layout,
  navigation,
  orgAccreditations,
  orgAccreditation,
  orgAdmins,
  organisation: profileOrganisation,
  organisations,
  orgVerifications,
  people,
  reference,
  router: routerReducer,
  storage,
  userProfile,
  userVerifications,
  userSettings
})

export default reducers
