import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

class FormerNamesList extends Component {
  renderItem = (item, index) => {
    const { remove, pending } = this.props
    return (
      <tr key={index}>
        <td className="col-xs-12 col-md-2">{item.first_name}</td>
        <td className="col-xs-12 col-md-2">{item.last_name}</td>
        <td className="col-xs-12 col-md-2 text-center">
          {moment(item.start_date).format('DD/MM/YYYY')}
        </td>
        <td className="col-xs-12 col-md-2 text-center">
          {moment(item.end_date).format('DD/MM/YYYY')}
        </td>
        <td className="col-xs-12 col-md-3">
          <button
            className="btn red-btn action-btn"
            disabled={pending}
            onClick={() => {remove(item)}}
          >
            Remove
          </button>
        </td>
      </tr>
    )
  }

  render() {
    const { former_names } = this.props.user

    if (former_names.length === 0) {
      return null
    }

    return (
      <div className="form-group">
        <h2 className="form-group">Former names</h2>
        <table className="FormerNamesList VerificationList">
          <thead className="hidden-sm hidden-xs">
            <tr className="row">
              <th className="col-xs-12 col-md-2">First Name</th>
              <th className="col-xs-12 col-md-2">Last Name</th>
              <th className="col-xs-12 col-md-2 text-center">Start Date</th>
              <th className="col-xs-12 col-md-2 text-center">End Date</th>
              <th className="col-xs-12 col-md-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              former_names.map(this.renderItem)
            }
          </tbody>
        </table>
      </div>
    )
  }
}

FormerNamesList.propTypes = {
  user: PropTypes.shape({
    former_names: PropTypes.array
  }),
  remove: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired
}

export default FormerNamesList
