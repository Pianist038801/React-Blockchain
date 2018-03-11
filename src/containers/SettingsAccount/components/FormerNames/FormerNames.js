import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Notifications, { notify } from 'react-notify-toast'
import _isNil from 'lodash/isNil'
import classNames from 'classnames'
import Form from 'components/Abstract/Form'
import Datetime from 'react-datetime'

class FormerNames extends Form {
  constructor(props) {
    super(props)
    this.state = {
      errors: [],
      invalidDates: false,
      saving: false,
      first_name: '',
      last_name: '',
      start_date: '',
      end_date: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const { saving } = this.state
    if (saving && nextProps.saveErrorMsg === null) {
      // new name was added
      this.resetForm()
      this.notifyFn('Name saved correctly', 'success')
    } else if (saving && nextProps.saveErrorMsg !== this.props.saveErrorMsg) {
      // error happened on save
      this.setState({
        saving: false
      })
      this.notifyFn(nextProps.saveErrorMsg, 'error')
    }
  }

  validate() {
    const fields = ['first_name', 'last_name', 'start_date', 'end_date']
    const { start_date, end_date } = this.state
    const errors = []
    let invalidDates = false

    for (let i = 0; i < fields.length; i++) {
      const value = this.state[fields[i]]
      if (_isNil(value) || value === '') {
        errors.push(fields[i])
      }
    }

    if (errors.indexOf('start_date') === -1 &&
      errors.indexOf('end_date') === -1 &&
      new Date(start_date) > new Date(end_date)
    ) {
      invalidDates = true
      errors.push('start_date')
      errors.push('end_date')
    }

    this.setState({
      errors,
      invalidDates
    })

    return { errors, invalidDates }
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { errors, invalidDates } = this.validate()
    const { former_names } = this.props.user
    const { first_name, last_name, start_date, end_date } = this.state
    if (errors.length === 0 && !invalidDates) {
      this.setState({
        saving: true
      })
      former_names.push({ first_name, last_name, start_date, end_date })
      this.props.save({former_names})
    }
  }

  notifyFn(message, type) {
    // this is a wrapper function to make the unit test happy
    notify.show(message, type, 4000)
  }

  resetForm() {
    this.setState({
      errors: [],
      invalidDates: false,
      saving: false,
      first_name: '',
      last_name: '',
      start_date: '',
      end_date: ''
    })
  }

  render() {
    const inputProps = {
      placeholder: 'DD/MM/YYYY'
    }
    const today = moment()
    const validDates = function(current){
      return current.isBefore(today)
    }
    const { pending } = this.props
    const { errors, invalidDates, first_name, last_name, start_date, end_date } = this.state
    const startDate = (start_date !== '') ? moment(start_date) : ''
    const endDate = (end_date !== '') ? moment(end_date) : ''

    return (
      <div>
        <Notifications />
        <h2 className="form-group">Add new former names</h2>
        <form>
          <div className="row">
            <div className="col-md-6">
              <div
                className={classNames('form-group', {
                  'has-error': errors.indexOf('first_name') !== -1
                })}
              >
                <label>First Name</label>
                <input name="first_name" value={first_name} type="text" onChange={this.onChangeInput} />
              </div>
            </div>
            <div className="col-md-6">
              <div
                className={classNames('form-group', {
                  'has-error': errors.indexOf('last_name') !== -1
                })}
              >
                <label>Last Name</label>
                <input name="last_name" value={last_name} type="text" onChange={this.onChangeInput} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div
                className={classNames('form-group', {
                  'has-error': errors.indexOf('start_date') !== -1
                })}
              >
                <label>Start Date</label>
                <Datetime
                  name="start_date"
                  value={startDate}
                  dateFormat="DD/MM/YYYY"
                  inputProps={inputProps}
                  timeFormat={false}
                  isValidDate={validDates}
                  onChange={(date) => {
                    if (date && date.format) {
                      this.onChangeInput({
                        target: {
                          name: 'start_date',
                          value: date.format('YYYY-MM-DD')
                        }
                      })
                    }
                  }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div
                className={classNames('form-group', {
                  'has-error': errors.indexOf('end_date') !== -1
                })}
              >
                <label>End Date</label>
                <Datetime
                  name="end_date"
                  value={endDate}
                  dateFormat="DD/MM/YYYY"
                  inputProps={inputProps}
                  timeFormat={false}
                  isValidDate={validDates}
                  onChange={(date) => {
                    if (date && date.format) {
                      this.onChangeInput({
                        target: {
                          name: 'end_date',
                          value: date.format('YYYY-MM-DD')
                        }
                      })
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {invalidDates &&
            <div className="form-group has-error message">
              End Date can not be earlier than Start Date
            </div>
          }

          <div className="form-group">
            <button
              className="form-btn save"
              disabled={pending}
              onClick={this.onSubmit}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    )
  }
}

FormerNames.propTypes = {
  user: PropTypes.shape({
    former_names: PropTypes.array
  }),
  save: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired
}

export default FormerNames
