import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ROUTE_URL } from 'containers/constants.js'

const Navigation = (props) => {
  const { toggleMenu, intelligentLink } = props
  return (
    <div className="header-menu active">
      <div className="logo-holder">
        <span className="big-logo" />
        <i
          className="close-menu"
          onClick={toggleMenu}
        >
          &nbsp;
        </i>
      </div>
      <ul>
        <li><Link to={ROUTE_URL.people}>People</Link></li>
        <li><Link to={ROUTE_URL.organisations}>Organisations</Link></li>
        {intelligentLink &&
          <li><a href={intelligentLink}>Intelligent Profile</a></li>
        }
        <li><a href={ROUTE_URL.publicSiteContact}>Contact</a></li>
        <li>APPII Ltd &copy; 2017</li>
      </ul>
    </div>
  )
}

Navigation.propTypes = {
  intelligentLink: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  toggleMenu: PropTypes.func.isRequired
}

export default Navigation
