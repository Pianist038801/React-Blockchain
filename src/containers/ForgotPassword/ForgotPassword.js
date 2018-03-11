import React from 'react'
import Notifications, { notify } from 'react-notify-toast'
import { ROUTE_URL, getApiUrl } from 'containers/constants'
import Form from 'components/Abstract/Form'
import httpFetch from 'utils/httpFetch'
import 'containers/Register/style.css'

class ForgotPassword extends Form {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      sending: false
    }
    this.genericError = 'An error occured. Please try again.'
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentDidMount() {
    document.body.classList.add('login-page')
  }

  componentWillUnmount() {
    document.body.classList.remove('login-page')
  }

  onSubmit(event) {
    event.preventDefault()
    const { email } = this.state
    if (email !== '' && email.indexOf('@') !== -1 && email.indexOf('.') !== -1) {
      this.setState({ sending: true })
      httpFetch(`${getApiUrl('recoverPassword')}?email=${email}`, {
        method: 'GET'
      })
      .then((data) => {
        if (data.status === 'success') {
          notify.show(data.message, 'success', 4000)
        } else {
          const msg = data.message || this.genericError
          notify.show(msg, 'error', 4000)
        }
        this.setState({ sending: false })
      })
      .catch(() => {
        notify.show(this.genericError, 'error', 4000)
        this.setState({ sending: false })
      })
    } else {
      notify.show('Please enter an email', 'error', 4000)
    }
  }

  render() {
    const { email, sending } = this.state

    return (
      <form className="Login-page">
        <Notifications />
        <section className="Login-block">
          <h1 className="Login-logo">
            {/* external link - not react route - leave <a> */}
            <a href={ROUTE_URL.publicSiteHome}><span>APPII</span></a>
          </h1>
          <p className="Login-title">Recover your password</p>
          <div className="form-group">
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <button className="border-btn" onClick={this.onSubmit} disabled={sending}>
              {!sending ? 'Send' : 'Please wait'}
            </button>
          </div>
        </section>
      </form>
    )
  }
}

export default ForgotPassword
