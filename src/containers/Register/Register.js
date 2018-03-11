import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import _assign from 'lodash/assign'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import Notifications, { notify } from 'react-notify-toast'
import { ROUTE_URL, STORAGE_KEY, getApiUrl } from 'containers/constants'
import Form from 'components/Abstract/Form'
import httpFetch from 'utils/httpFetch'
import Technojobs from './components/Technojobs'
import './style.css'

class Register extends Form {
  constructor(props) {
    super(props)
    let data = window.sessionStorage.getItem(STORAGE_KEY.register)
    if (data) {
      data = JSON.parse(data)
    }

    this.state = {
      // this is not camel case because of the B/E
      first_name: (data && data.first_name) ? data.first_name : '',
      last_name: (data && data.last_name) ? data.last_name : '',
      email: (data && data.email) ? data.email : '',
      password: (data && data.password) ? data.password : '',
      days: (data && data.days) ? data.days : '',
      month: (data && data.month) ? data.month : '',
      year: (data && data.year) ? data.year : '',
      agreed: (data && data.agreed) ? data.agreed : false,
      pending: false,
      showSuccess: false,
      inValidFields: []
    }
    this.genericError = 'Registration failed. Please try again.'
    this.dob = `${this.state.year}-${this.state.month.value}-${this.state.days.day}`
    this.months = [
      { text: 'January', value: '01' },
      { text: 'February', value: '02' },
      { text: 'March', value: '03' },
      { text: 'April', value: '04' },
      { text: 'May', value: '05' },
      { text: 'June', value: '06' },
      { text: 'July', value: '07' },
      { text: 'August', value: '08' },
      { text: 'September', value: '09' },
      { text: 'October', value: '10' },
      { text: 'November', value: '11' },
      { text: 'December', value: '12' }
    ]
    this.years = this.calculateYears()
    this.generatedDays = this.calculateDays()
  }

  componentDidMount() {
    document.body.classList.add('login-page')
  }

  componentWillUnmount() {
    document.body.classList.remove('login-page')
  }

  notifyFn(message, type) {
    // this is a wrapper function to make the unit test happy
    notify.show(message, type, 4000)
  }

  showAgeRestriction = () => {
    const msg = `
    Providing your date of birth helps make sure that you get the right APPII experience for your age.
    At present,  only those 13 years of age and older can create an APPII account.
    For more details, please visit our Data Policy or FAQs.
    `
    this.notifyFn(msg, 'warning')
  }

  showPasswordRequirements = () => {
    const msg = `
    The password must be at least 8 characters long, contain a capital letter, and a number.
    `
    this.notifyFn(msg, 'warning')
  }

  checkAge(dob) {
    const age = moment().diff(dob, 'years', true)
    return age < 13
  }

  isFormValid = () => {
    const { email, agreed } = this.state

    const isEmptyFields = () => {
      const fields = ['first_name', 'last_name', 'email', 'password', 'year', 'days', 'month']
      const inValidFields = fields.filter(item => {
        if ((item === 'days' || item === 'month') && !this.state[item]) return true
        return this.state[item] === ''
      })
      return inValidFields
    }

    const isEmailInValid = () => {
      const re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm
      return (email === '' || !re.test(email))
    }

    const inValidFields = isEmptyFields()

    if (inValidFields.length) {
      return {
        isValid: false,
        message: 'Please all inputs are mandatory',
        inValidFields: inValidFields
      }
    } else if (isEmailInValid()) {
      return {
        isValid: false,
        message: 'Please enter a valid email address',
        inValidFields: ['email']
      }
    } else if (this.checkAge(this.dob)) {
      return {
        isValid: false,
        message: 'At present, only those 13 years of age and older can create an APPII account',
        inValidFields: ['year', 'days', 'month']
      }
    } else if (!agreed) {
      return {
        isValid: false,
        message: 'Please agree to the terms of use',
        inValidFields: ['agreed']
      }
    } else {
      return {
        isValid: true
      }
    }
  }

  resetForm() {
    this.setState({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      agreed: false,
      pending: false,
      showSuccess: false,
      inValidFields: []
    })
    this.dob = ''
  }

  resendConfirmation = () => {
    const data = {
      email: this.state.email
    }

    httpFetch(getApiUrl('userResendConfirmation'), {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(() => {
      this.notifyFn('Confirmation email sent.', 'success')
    }).catch(() => {
      this.notifyFn('Resending confirmation failed. Please try again.', 'error')
    })
  }

  sendData = () => {
    const { technojobsId, technojobsHash } = this.props.match.params
    const { first_name, last_name, email, password } = this.state

    const data = {
      first_name,
      last_name,
      email,
      password,
      dob: this.dob
    }

    if (technojobsId && technojobsHash) {
      data.technojobsId = technojobsId
      data.technojobsHash = technojobsHash
    }

    httpFetch(getApiUrl('user'), {
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then((response) => {
      this.setState({
        pending: false
      })
      return response
    })
    .then((data) => {
      if (data.status === 'success') {
        this.resetForm()
        this.setState({
          showSuccess: true
        })
      } else {
        const msg = (data.errors && data.errors[0]) ?
          (data.errors[0].message || data.errors[0].error) : this.genericError
        this.notifyFn(msg, 'error')

        if (data.errors && data.errors[0] && data.errors[0].field) {
          this.setState({
            inValidFields: [data.errors[0].field]
          })
        }
      }
    })
    .catch(() => {
      this.notifyFn(this.genericError, 'error')
    })
  }

  onSubmit = (event) => {
    event.preventDefault()

    this.setState({
      pending: true
    })

    const isFormValid = this.isFormValid()

    if (!isFormValid.isValid) {
      this.setState({
        pending: false,
        inValidFields: isFormValid.inValidFields
      })
      this.notifyFn(isFormValid.message, 'error')
    } else {
      this.sendData()
    }
  }

  navigateToTerms = () => {
    let data = _assign({}, this.state)
    delete data.inValidFields
    delete data.pending
    delete data.showSuccess
    data = JSON.stringify(data)
    window.sessionStorage.setItem(STORAGE_KEY.register, data)
    this.props.history.push(ROUTE_URL.terms)
  }

  renderRegisterSuccess() {
    window.sessionStorage.removeItem(STORAGE_KEY.register)

    return (
      <div className="Login-page Register-confirm">
        <Notifications />
        <div className="center">
          <p>
            Thanks for signing up. You’ll receive an email shortly.
            Click the link to confirm your email address.
            <br/>
            <span className="info-text">Please also check your SPAM folder for the confirmation email</span>
          </p>
          <p>
            <Link to={ROUTE_URL.login} className="border-btn">
              Login
            </Link>
            <br/>
            <a onClick={this.resendConfirmation} className="block-link">
              Resend confirmation email
            </a>
          </p>
        </div>
      </div>
    )
  }

  calculateYears() {
    let array = [],
      current_year = (new Date()).getFullYear()
    for (let i = 0; i < 100; i++) {
      array.push({ text: (current_year - i).toString() })
    }
    return array
  }

  calculateDays = () => {
    let days = []
    for (let i = 1; i <= 31; i++) {
      let count = (i < 10) ? `0${i}` : i
      days.push({ day: count })
    }
    return days
  }

  handleChange = (value, title) => {
    this.setState({
      [title]: value
    }, () => {
      if (this.state.month && this.state.year && this.state.days) {
        this.dob = `${this.state.year}-${this.state.month.value}-${this.state.days.day}`
      }
    })
  }

  render() {
    const {
      showSuccess,
      first_name,
      last_name,
      email,
      password,
      agreed,
      pending,
      days,
      month,
      year,
      inValidFields
    } = this.state

    const { technojobsId, technojobsHash } = this.props.match.params
    const registerLabel = (pending) ? 'Please wait' : 'Get Started'
    const dayValue = (days && days.day) ? { day: days.day } : ''
    const monthValue = (month && month.text) ? { text: month.text } : ''
    const yearValue = (year) ? { text: year } : ''

    if (showSuccess) {
      return this.renderRegisterSuccess()
    }

    const isInputHighlighted = name => {
      return (inValidFields && inValidFields.length && inValidFields.indexOf(name) !== -1)
    }

    return (
      <form className="Login-page">
        <Notifications />
        <section className="Login-block">
          <h1 className="Login-logo">
            {/* external link - not react route - leave <a> */}
            <a href={ROUTE_URL.publicSiteHome}><span className="Login-block-span">APPII</span></a>
          </h1>
          <p className="Login-title">Create an account</p>
          <div className="form-group">
            <input
              name="first_name"
              type="text"
              placeholder="First Name"
              value={first_name}
              className={isInputHighlighted('first_name') ? 'inValid' : ''}
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <input
              name="last_name"
              type="text"
              placeholder="Last Name"
              value={last_name}
              className={isInputHighlighted('last_name') ? 'inValid' : ''}
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              className={isInputHighlighted('email') ? 'inValid' : ''}
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              className={isInputHighlighted('password') ? 'inValid' : ''}
              onChange={this.onChangeInput}
            />

            <div className="login-info-btn">
              <i
                className="tooltip-position-top tooltip-movable tooltip-success"
                data-tooltip="The password must be at least 8 characters long, contain a capital letter, and a number."
                onClick={this.showPasswordRequirements}
              >
                &nbsp;
              </i>
            </div>
          </div>

          <div className="form-group">
            <label className="label-dob">Date of birth</label>
            <div className="col-md-3 Register-datepicker-section">
              <Select
                labelKey="day"
                valueKey="day"
                placeholder="Day"
                options={this.generatedDays}
                value={dayValue}
                className={isInputHighlighted('days') ? 'inValid' : ''}
                onChange={v => this.handleChange(v, 'days')}
              />
            </div>

            <div className="col-md-5 Register-datepicker-section">
              <Select
                name="month"
                labelKey="text"
                valueKey="text"
                placeholder="Month"
                options={this.months}
                value={monthValue}
                className={isInputHighlighted('month') ? 'inValid' : ''}
                onChange={v => this.handleChange(v, 'month')}
              />
            </div>

            <div className="col-md-4 Register-datepicker-section">
              <Select
                name="year"
                labelKey="text"
                valueKey="text"
                placeholder="Year"
                options={this.years}
                value={yearValue}
                className={isInputHighlighted('year') ? 'inValid' : ''}
                onChange={v => this.handleChange(v.text, 'year')}
              />
            </div>

            <div className="login-info-btn">
              <i
                className="tooltip-position-top tooltip-movable tooltip-success"
                data-tooltip="We need this to verify your profile"
                onClick={this.showAgeRestriction}
              >
                &nbsp;
              </i>
            </div>
          </div>

          <div className="form-group text-center term-check">
            <span className="pull-left Login-block-span">
              I accept the APPII <span className="term-link" onClick={this.navigateToTerms}>terms of use</span>
            </span>
            <div className="form-checkbox no-label pull-right">
              <input
                name="agreed"
                type="checkbox"
                id="agree-terms"
                checked={agreed}
                onChange={this.onChangeInput}
              />
              <label htmlFor="agree-terms">&nbsp;</label>
            </div>
          </div>
          {technojobsId && technojobsHash &&
            <Technojobs />
          }
          <div className="form-group">
            <button className="border-btn" disabled={pending} onClick={this.onSubmit}>
              {registerLabel}
            </button>
          </div>
          <div className="form-group">
            <p className="form-devider">or</p>
          </div>
          <div className="form-group">
            <Link to={ROUTE_URL.login} className="border-btn">
              Login
            </Link>
          </div>
        </section>
      </form>
    )
  }
}

Register.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
}

export default Register
