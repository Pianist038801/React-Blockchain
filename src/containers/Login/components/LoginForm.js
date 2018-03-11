import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
  const { email, password, login, onChangeInput } = props
  return (
    <form>
      <div className="form-group">
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChangeInput}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChangeInput}
        />
      </div>
      <div className="form-group">
        <button
          className="border-btn"
          onClick={login}
        >
          Login
        </button>
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  onChangeInput: PropTypes.func.isRequired
}

export default LoginForm
