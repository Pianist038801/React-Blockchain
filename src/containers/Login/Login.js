import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Notifications, { notify } from 'react-notify-toast'
import { ROUTE_URL, STORAGE_KEY, getApiUrl } from 'containers/constants'
import Form from 'components/Abstract/Form'
import httpFetch from 'utils/httpFetch'
import 'containers/Register/style.css'
import LoginForm from './components/LoginForm'

class Login extends Form {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.onLogin = this.onLogin.bind(this)
  }

  componentDidMount() {
    document.body.classList.add('login-page')
  }

  componentWillReceiveProps(nextProps) {
    const { auth } = nextProps
    if (auth.error !== '') {
      notify.show(auth.error, 'error', 4000)
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('login-page')
  }

  onLogin(event) {
    event.preventDefault()
    const { email, password } = this.state

    httpFetch(getApiUrl('login'), {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      })
    })
    .then((data) => {
      if (data.token) {
        this.props.loginSuccess()
        this.props.setToken({
          token: data.token
        })
        this.props.fetchOrganisations()
        this.props.fetchReference()
        window.localStorage.setItem(STORAGE_KEY.token, data.token)
        window.localStorage.setItem(STORAGE_KEY.appBanner, 'true')
        this.props.history.push(ROUTE_URL.profile)
      } else {
        throw Error('Unable to login')
      }
    })
    .catch(() => {
      this.props.loginFailed()
    })
  }

  render() {
    const { email, password } = this.state
    return (
      <div className="Login-page">
        <Notifications />
        <section className="Login-block">
          <h1 className="Login-logo">
            {/* external link - not react route - leave <a> */}
            <a href={ROUTE_URL.publicSiteHome}><span>APPII</span></a>
          </h1>
          <p className="Login-title">Ready to maximise your potential?</p>
          <LoginForm
            email={email}
            password={password}
            login={this.onLogin}
            onChangeInput={this.onChangeInput}
          />
          <div className="form-group text-center">
            <Link className="block-link" to={ROUTE_URL.forgotPassword}>
              Forgot password?
            </Link>
          </div>
          <div className="form-group">
            <p className="form-devider">or</p>
          </div>
          <div className="form-group">
            <Link to={ROUTE_URL.register} className="border-btn">
              Create Account
            </Link>
          </div>
        </section>
      </div>
    )
  }
}

Login.propTypes = {
  auth: PropTypes.shape({
    error: PropTypes.string,
    pending: PropTypes.bool
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  fetchOrganisations: PropTypes.func.isRequired,
  fetchReference: PropTypes.func.isRequired,
  loginSuccess: PropTypes.func.isRequired,
  loginFailed: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired
}

export default withRouter(Login)

export { Login as LoginComponent }
