import React from 'react'
import PropTypes from 'prop-types'

const DeleteAccount = (props) => {

  const onClickHandler = (e) => {
    e.preventDefault()
    props.deleteUserAccount()
  }

  return (
    <div>
      <h2 className="form-group delete-account-title">Close your APPII account</h2>

      <form className="delete-account-form">
        <p className="delete-account-subtitle">Let us know why you are closing your account:</p>

        <ul className="delete-account-list">
          <li>
            <label>
              <input name="delete" type="radio" /> I have a duplicate account
            </label>
          </li>
          <li>
            <label>
              <input name="delete" type="radio" /> I have a privacy concern
            </label>
          </li>
          <li>
            <label>
              <input name="delete" type="radio" /> I’m not getting any value
            </label>
          </li>
          <li>
            <label>
              <input name="delete" type="radio" /> Other
            </label>
          </li>
        </ul>

        <button className="form-btn delete" onClick={onClickHandler}>
          Delete Account
        </button>
      </form>
    </div>
  )
}

DeleteAccount.propTypes = {
  deleteUserAccount: PropTypes.func.isRequired
}

export default DeleteAccount
