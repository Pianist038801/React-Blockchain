import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

const SelectAccreditationLevel = (props) => {
  const options = [
    {value: 'Level 1', label: 'Level 1'},
    {value: 'Level 2', label: 'Level 2'},
    {value: 'Level 3', label: 'Level 3'}
  ]
  const { value, onChangeInput } = props

  return (
    <div className="form-group">
      <label>Accreditation Level</label>
      <Select
        name="select-accr-level"
        placeholder="Choose one"
        options={options}
        value={value}
        onChange={(obj) => {
          onChangeInput({
            target: {
              name: 'level',
              value: (obj) ? obj.value : ''
            }
          })
        }}
      />
    </div>
  )
}

SelectAccreditationLevel.propTypes = {
  value: PropTypes.string,
  onChangeInput: PropTypes.func.isRequired
}

export default SelectAccreditationLevel
