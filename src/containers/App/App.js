import { Component } from 'react'
import PropTypes from 'prop-types'
import { ROUTE_URL, STORAGE_KEY } from 'containers/constants'

class App extends Component {
  componentWillMount() {
    const token = window.localStorage.getItem(STORAGE_KEY.token)
    const { location, history } = this.props
    if (token && token !== '' && token !== 'null') {
      this.props.setToken({ token })
      this.props.fetchUser()
      this.fetchData()
      window.localStorage.setItem(STORAGE_KEY.appBanner, 'true')
      if (location.pathname === '/' ||
        location.pathname === ROUTE_URL.register ||
        location.pathname === ROUTE_URL.login
      ) {
        history.push(ROUTE_URL.profile)
      }
    } else if (location.pathname === '/') {
      history.push(ROUTE_URL.login)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.token !== nextProps.token &&
      nextProps.token === null) {
      // token expired - go to login
      this.props.history.push(ROUTE_URL.login)
    } else if (this.props.token === null &&
      this.props.token !== nextProps.token) {
      // user is logged in
      this.fetchData()
    }
  }

  fetchData() {
    this.props.fetchOrganisations()
    this.props.fetchReference()
  }

  render() {
    return null
  }
}

App.propTypes = {
  location: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  setToken: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  fetchOrganisations: PropTypes.func.isRequired,
  fetchReference: PropTypes.func.isRequired,
  token: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
}

export default App
