import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

const SelectDeliveryType = (props) => {
  const options = [
    {value: 'In a classroom', label: 'In a classroom'},
    {value: 'Online', label: 'Online'},
    {value: 'At an event', label: 'At an event'},
    {value: 'In a building', label: 'In a building'},
    {value: 'Achievement', label: 'Achievement'}
  ]
  const { value, onChangeInput } = props

  return (
    <div className="form-group">
      <label>Accreditation Delivery Type</label>
      <Select
        name="select-delivery-type"
        placeholder="Select Delivery Type"
        options={options}
        value={value}
        onChange={(obj) => {
          onChangeInput({
            target: {
              name: 'delivery_type',
              value: (obj) ? obj.value : ''
            }
          })
        }}
      />
    </div>
  )
}

SelectDeliveryType.propTypes = {
  value: PropTypes.string,
  onChangeInput: PropTypes.func.isRequired
}

export default SelectDeliveryType
