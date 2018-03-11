import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _filter from 'lodash/filter'
import FormerNamesList from 'containers/SettingsAccount/components/FormerNamesList'
import FormerNames from 'containers/SettingsAccount/components/FormerNames'

class PersonalDetails extends Component {
  saveFormerNames = (data) => {
    this.props.updateUserProfile(data)
  }

  removeFormerNames = (data) => {
    const { former_names } = this.props.user
    const filter = _filter(former_names, function(o) {
      return o.first_name !== data.first_name &&
        o.last_name !== data.last_name &&
        o.start_date !== data.start_date &&
        o.end_date !== data.end_date
    })

    this.props.updateUserProfile({
      former_names: filter
    })
  }

  render() {
    const { user, saveErrorMsg, pending } = this.props

    return (
      <div>
        <FormerNamesList
          user={user}
          remove={this.removeFormerNames}
          pending={pending}
        />
        <FormerNames
          user={user}
          saveErrorMsg={saveErrorMsg}
          save={this.saveFormerNames}
          pending={pending}
        />
      </div>
    )
  }
}

PersonalDetails.propTypes = {
  user: PropTypes.shape({
    former_names: PropTypes.array
  }),
  saveErrorMsg: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  pending: PropTypes.bool.isRequired,
  updateUserProfile: PropTypes.func.isRequired
}

export default PersonalDetails
