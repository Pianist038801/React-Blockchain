export const ROUTE_URL = {
  publicSiteHome: 'http://appii.io',
  publicSiteContact: 'http://appii.io/contact-us/',
  publicSiteHelp: 'http://appii.io/faqs/',
  home: '/profile',
  cookies: '/cookies',
  confirmEmail: '/confirm-email/:token',
  login: '/login',
  logout: '/logout',
  forgotPassword: '/recover-password',
  resetPassword: '/recover-password/:token',
  register: '/register',
  registerTechnojob: '/register/technojobs/:technojobsId/:technojobsHash',
  organisations: '/organisations',
  orgProfile: '/organisations/:orgId',
  orgAccreditations: '/organisations/:orgId/accreditations',
  orgAccreditationQRCode: '/organisations/:orgId/accreditations/:id/qrcode',
  orgAccreditationEdit: '/organisations/:orgId/accreditations/:id/edit',
  orgAccreditationMembers: '/organisations/:orgId/accreditations/:id/members',
  orgVerifications: '/organisations/:orgId/verifications',
  orgAdmins: '/organisations/:orgId/admins',
  newOrganisation: '/organisation/new',
  people: '/people',
  profile: '/profile',
  privacy: '/privacy-policy',
  privacy2: '/privacy-policy-2',
  settingsAccount: '/settings/account',
  terms: '/terms-of-use',
  terms2: '/terms-of-use-2',
  userProfile: '/profile/:uid',
  userVerifications: '/personal-verification',
  helpBiometric: '/help/biometric'
}

const API_URL = {
  confirmEmail: '/apis/userapi/v0.1/user/confirmEmail',
  login: '/api/login',
  organisations: '/apis/userapi/v0.1/organisations',
  organisationsEmployees: '/apis/userapi/v0.1/organisations/:orgId/employees',
  organisationsAdmins: '/apis/userapi/v0.1/organisations/:orgId/admins',
  organisationsSearch: '/apis/userapi/v0.1/organisations/search',
  recoverPassword: '/apis/userapi/v0.1/user/recoverPassword',
  changePassword: '/apis/userapi/v0.1/user/changePassword',
  user: '/apis/userapi/v0.1/user',
  userAdminOrganisations: '/apis/userapi/v0.1/user/adminOrganisations',
  userAwards: '/apis/userapi/v0.1/user/awards',
  userJobs: '/apis/userapi/v0.1/user/jobs',
  userEducations: '/apis/userapi/v0.1/user/educations',
  userResendConfirmation: '/apis/userapi/v0.1/user/requestConfirmationEmail',
  orgAccreditations: '/apis/userapi/v0.1/organisations/:orgId/accreditations',
  orgVerifications: '/apis/userapi/v0.1/organisations/:orgId/verifications',
  otherUser: '/apis/userapi/v0.1/user/:uid',
  otherUserAwards: '/apis/userapi/v0.1/user/:uid/awards',
  otherUserJobs: '/apis/userapi/v0.1/user/:uid/jobs',
  otherUserEducations: '/apis/userapi/v0.1/user/:uid/educations',
  userVerifications: '/apis/userapi/v0.1/user/verificationRequests',
  users: '/apis/userapi/v0.1/users',
  reference: '/apis/userapi/v0.1/referenceData/findByIdentifier?identifier=',
  orgAutocomplete: '/apis/userapi/v0.1/organisations/search?q=',
  userSettings: '/apis/userapi/v0.1/user/settings',
  deleteUserAccount: '/apis/userapi/v0.1/user/tagForDelete',
  verification: '/apis/userapi/v0.1/verification/request',
  activity: '/apis/userapi/v0.1/user/log',
  verifiedStudents: '/apis/userapi/v0.1/organisations/:orgId/students',
  profileImage: '/profile/:id/profileImage',
  logoImage: '/organisation/:orgId/logoImage',
  storage: '/apis/userapi/v0.1/jsonStorage'
}

const LOCATION_ORIGIN = {
  test: 'https://test-jdc9nn.appii.io',
  staging: 'https://staging.appii.io',
  production: 'https://appii.io'
}

export const getIntelligentProfileUrl = function(token, locationOrigin) {
  let url
  switch (locationOrigin) {
    case LOCATION_ORIGIN.staging:
    case LOCATION_ORIGIN.production:
      url = `https://intelligent-profile.appii.io/setting_up?jwt=${token}`
      break
    case LOCATION_ORIGIN.test:
      url = `https://intelligentprofile-test-jdc9nn.appii.io/setting_up?jwt=${token}`
      break
    default:
      url = false
  }

  return url
}

export const getApiUrl = function(key) {
  let baseUrl
  switch (process.env.REACT_APP_API_ENV) {
    case 'local':
      baseUrl = 'http://localhost:3333'
      break
    case 'staging':
      baseUrl = '//staging.appii.io/be'
      break
    case 'test':
      baseUrl = 'https://api-test-jdc9nn.appii.io'
      break
    case 'production':
      baseUrl = 'https://api.appii.io'
      break
    default:
      baseUrl = 'https://api-test-jdc9nn.appii.io'
  }
  return baseUrl + API_URL[key]
}

export const getApiErrorMessage = function(json) {
  let message = 'An unknown error has occured. Please try again'
  if (json && json.errors && json.errors[0]) {
    if (json.errors[0].error) {
      message = json.errors[0].error
    } else if (json.errors[0].validation && json.errors[0].message) {
      message = json.errors[0].message
    }
  }

  return message
}

export const APP_PREFIX = '@appii'

export const STORAGE_KEY = {
  token: `${APP_PREFIX}:token`,
  register: `${APP_PREFIX}:register`,
  appBanner: `${APP_PREFIX}:appBanner`
}

export const INSTAGRAM_ID = 'b014437f44774eada8f4595b95994927'

export const DEFAULT_ORDER = {
  education: 0,
  jobs: 1,
  award: 2,
  cpd: 3,
  certificate: 4,
  achievement: 5,
  project: 6,
  skill: 7,
  language: 8
}

export const IOS_APP_URL = 'https://itunes.apple.com/gb/app/appii/id1215363651?mt=8'
export const ANDROID_APP_URL = 'https://play.google.com/store/apps/details?id=com.appii'

export const VISIBILITY_OPTIONS = [
  {value: 'private', label: 'Only Me'},
  {value: 'public', label: 'Everyone'},
  {value: 'registered', label: 'Registered Users'},
  {value: 'verifiers', label: 'Verifiers'}
]

export default {
  ROUTE_URL,
  APP_PREFIX,
  STORAGE_KEY,
  INSTAGRAM_ID,
  DEFAULT_ORDER,
  IOS_APP_URL,
  ANDROID_APP_URL,
  VISIBILITY_OPTIONS,
  getApiUrl,
  getApiErrorMessage,
  getIntelligentProfileUrl
}
