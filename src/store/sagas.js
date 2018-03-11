import { all } from 'redux-saga/effects'
import organisations from 'containers/Organisations/saga'
import people from 'containers/People/saga'
import profile from 'containers/Profile/saga'
import profileOrganisation from 'containers/ProfileOrganisation/saga'
import userVerifications from 'containers/UserVerifications/saga'
import orgVerifications from 'containers/OrgVerifications/saga'
import orgAccreditations from 'containers/OrgAccreditations/saga'
import orgAccreditation from 'containers/OrgAccreditationQRCode/saga'
import orgAdmins from 'containers/OrgAdmins/saga'
import userSettings from 'containers/SettingsAccount/saga'
import auth from './auth/saga'
import reference from './reference/saga'
import storage from './storage/saga'

export default function* rootSaga() {
  yield all([
    auth(),
    organisations(),
    people(),
    profileOrganisation(),
    profile(),
    userVerifications(),
    orgVerifications(),
    orgAccreditations(),
    orgAccreditation(),
    orgAdmins(),
    reference(),
    storage(),
    userSettings()
  ])
}
