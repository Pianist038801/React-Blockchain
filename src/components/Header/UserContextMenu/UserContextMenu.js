import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { ROUTE_URL } from 'containers/constants.js'
import Avatar from 'components/Avatar'
import Assets from 'components/Profile/ProfileInfo/assets'
import './style.css'

const UserContextMenu = (props) => {
  const { user, organisations, toggleDropDown, showDropdown } = props
  const css = classNames('profile-header active', { 'dropdown-active': showDropdown })
  const renderOrganisations = () => {
    if (organisations.length) {
      return  organisations.map((item, index) => {
        let link = ROUTE_URL.orgProfile
        link = link.replace(':orgId', item.id)
        return (
          <li key={index}>
            <Link to={link}>{item.name}</Link>
          </li>
        )
      })
    }
    return null
  }
  const avatarIcon = (user.biometrics_status !== 'complete') ? 'danger' : ''
  const showBiometricLink = user.biometrics_status !== 'complete'

  return (
    <div className={css} onClick={toggleDropDown}>
      <span>Hi, <b>{user.first_name}</b></span>
      <span className="UserContextMenu-avatar">
        <Avatar imageUrl={user.profile_image} icon={avatarIcon} />
      </span>
      {
        showDropdown &&
        <div className="nav-dropdown nav-dropdown-wrapper">
          <ul className="profile-nav">
            <li>
              <Link className="h-profile" to={ROUTE_URL.profile}>Profile</Link>
            </li>
            {showBiometricLink &&
              <li className="profile-nav-bioID">
                <Link className="h-bioID" to={ROUTE_URL.helpBiometric}>Identity Not Verified</Link>
                <img src={Assets.iconDanger} alt="icon warning"/>
              </li>
            }
            <li>
              <Link className="h-verifications" to={ROUTE_URL.userVerifications}>My Verifications</Link>
            </li>
            {
              organisations.map((item, index) => {
                let link = ROUTE_URL.orgVerifications
                link = link.replace(':orgId', item.id)
                return (
                  <li key={index}>
                    <Link className="h-verifications" to={link}>{item.name}</Link>
                  </li>
                )
              })
            }
            <li>
              <Link className="h-settings" to={ROUTE_URL.settingsAccount}>Settings</Link>
            </li>
            <li>
              <a className="h-help" href={ROUTE_URL.publicSiteHelp}>Help</a>
            </li>
            {organisations.length > 0 &&
              <li className="no-border-bottom">
                <Link className="h-organisation" to={ROUTE_URL.organisations}>Organisations</Link>
              </li>
            }
            {renderOrganisations()}
            <li><Link className="h-logout" to={ROUTE_URL.logout}>Log Out</Link></li>
          </ul>
        </div>
      }
    </div>
  )
}

UserContextMenu.propTypes = {
  user: PropTypes.object.isRequired,
  organisations: PropTypes.array.isRequired,
  toggleDropDown: PropTypes.func.isRequired,
  showDropdown: PropTypes.bool.isRequired
}

export default UserContextMenu
