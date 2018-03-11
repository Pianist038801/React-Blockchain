import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

const SelectAccrediationType = (props) => {
  const options = [
    {value: 'Education', label: 'Education'},
    {value: 'Certification', label: 'Certification'},
    {value: 'Professional Development (CPD)', label: 'Professional Development (CPD)'},
    {value: 'Awards', label: 'Awards'},
    {value: 'Achievement', label: 'Achievement'}
  ]
  const { value, onChangeInput } = props

  return (
    <div className="form-group">
      <label>Accreditation Type</label>
      <Select
        name="select-accr-type"
        placeholder="Select Type"
        options={options}
        value={value}
        onChange={(obj) => {
          onChangeInput({
            target: {
              name: 'type',
              value: (obj) ? obj.value : ''
            }
          })
        }}
      />
    </div>
  )
}

SelectAccrediationType.propTypes = {
  value: PropTypes.string,
  onChangeInput: PropTypes.func.isRequired
}

export default SelectAccrediationType
