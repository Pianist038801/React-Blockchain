import React from 'react'
import PropTypes from 'prop-types'
import Input from 'components/FormElements/Input'
import SelectAccreditationLevel from '../SelectAccreditationLevel'
import SelectDeliveryType from '../SelectDeliveryType'
import DateTimeInputs from '../DateTimeInputs'
import SelectAccreditationType from '../SelectAccreditationType'
import SelectStatus from '../SelectStatus'

const SharedInputs = (props) => {
  const { onChangeInput, data } = props
  return (
    <div className="separator">
      <div className="row">
        <div className="col-md-6">
          <SelectAccreditationType
            value={data.type}
            onChangeInput={onChangeInput}
          />
        </div>
        <div className="col-md-6">
          <SelectStatus
            value={parseInt(data.enabled, 10)}
            onChangeInput={onChangeInput}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Input name="award_location" value={data.award_location} label="Location" onChange={onChangeInput} />
        </div>
        <div className="col-md-6">
          <Input name="link" value={data.link} label="Accreditation Link" onChange={onChangeInput} />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <SelectDeliveryType
            value={data.delivery_type}
            onChangeInput={onChangeInput}
          />
        </div>
        <div className="col-md-6">
          <SelectAccreditationLevel
            value={data.level}
            onChangeInput={onChangeInput}
          />
        </div>
      </div>

      <DateTimeInputs data={data} start={true} onChangeInput={onChangeInput} />
      <DateTimeInputs data={data} start={false} onChangeInput={onChangeInput} />
    </div>
  )
}

SharedInputs.propTypes = {
  data: PropTypes.object,
  onChangeInput: PropTypes.func.isRequired
}

export default SharedInputs
