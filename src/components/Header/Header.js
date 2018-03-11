import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ROUTE_URL, getIntelligentProfileUrl } from 'containers/constants.js'
import Navigation from './Navigation.js'
import NavigationMobile from './NavigationMobile'
import UserContextMenu from './UserContextMenu'
import Actions from './Actions.js'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMenu: false,
      showDropdown: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isMobileNavActive} = nextProps
    const { showMenu } = this.state
    if (window.innerWidth <= 768 && !isMobileNavActive &&  showMenu) {
      this.setState({showMenu: false})
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { showDropdown } = nextState
    if (showDropdown) {
      document.addEventListener('click', this.toggleDropDown)
    } else {
      document.removeEventListener('click', this.toggleDropDown)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.toggleDropDown)
  }

  toggleMenu = () => {
    const showMenu = !this.state.showMenu
    this.setState({ showMenu })
    this.props.setMobileNavActive(showMenu)
  }

  toggleDropDown = () => {
    this.setState({
      showDropdown: !this.state.showDropdown
    })
  }

  renderLoggedIn() {
    const {
      editLabel,
      editMode,
      canEdit,
      saveChanges,
      undoChanges,
      toggleEditMode,
      loading,
      user,
      organisations,
      token,
      isMobileNavActive,
      setMobileNavActive
    } = this.props
    const { showMenu, showDropdown } = this.state
    let intelligentLink = false
    if (token && token !== '') {
      intelligentLink = getIntelligentProfileUrl(token, window.location.origin)
    }
    return (
      <header>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 col-md-6">
              <div className="header-left">
                <h1 className="logo">
                  <Link to={ROUTE_URL.home}>APPII</Link>
                </h1>
                <span
                  className="header-menu-toggle hidden-sm hidden-xs"
                  onClick={this.toggleMenu}
                >
                  &nbsp;
                </span>
                <span
                  className="header-mobile-menu-toggle hidden-md hidden-lg"
                  onClick={this.toggleMenu}
                >
                  &nbsp;
                </span>
                {
                  showMenu ?
                    window.innerWidth > 768 ?
                      <Navigation
                        user={user}
                        intelligentLink={intelligentLink}
                        toggleMenu={this.toggleMenu}
                      /> :
                      <NavigationMobile
                        user={user}
                        intelligentLink={intelligentLink}
                        active={isMobileNavActive}
                        organisations={organisations}
                        setMobileNavActive={setMobileNavActive}
                      />
                    : null
                }
              </div>
              <div className="header-right-mobile hidden-md hidden-lg">
                <Actions
                  editLabel={editLabel}
                  canEdit={canEdit}
                  editMode={editMode}
                  isMobile={true}
                  saveChanges={saveChanges}
                  undoChanges={undoChanges}
                  toggleEditMode={toggleEditMode}
                />
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 hidden-sm hidden-xs">
              <div className="header-right">
                <Actions
                  editLabel={editLabel}
                  canEdit={canEdit}
                  editMode={editMode}
                  isMobile={false}
                  loading={loading}
                  saveChanges={saveChanges}
                  undoChanges={undoChanges}
                  toggleEditMode={toggleEditMode}
                />
                <UserContextMenu
                  user={user}
                  organisations={organisations}
                  showDropdown={showDropdown}
                  toggleDropDown={this.toggleDropDown}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  renderLoggedOut() {
    return (
      <header>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 col-md-6">
              <div className="header-left">
                <h1 className="logo">
                  {/* external link - not react route - leave <a> */}
                  <a href={ROUTE_URL.publicSiteHome}>APPII</a>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  render() {
    const { user, isLoggedIn } = this.props

    if (user && isLoggedIn) {
      return this.renderLoggedIn()
    }

    return this.renderLoggedOut()
  }
}

Header.defaultProps = {
  toggleEditMode: () => {},
  undoChanges: () => {},
  saveChanges: () => {}
}

Header.propTypes = {
  user: PropTypes.object,
  organisations: PropTypes.array,
  isLoggedIn: PropTypes.bool.isRequired,
  editLabel: PropTypes.string,
  editMode: PropTypes.bool,
  canEdit: PropTypes.bool,
  loading: PropTypes.bool,
  toggleEditMode: PropTypes.func,
  token: PropTypes.string,
  undoChanges: PropTypes.func,
  saveChanges: PropTypes.func,
  isMobileNavActive: PropTypes.bool,
  setMobileNavActive: PropTypes.func
}

export default Header
