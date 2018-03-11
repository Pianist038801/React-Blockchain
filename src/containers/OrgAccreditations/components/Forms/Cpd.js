import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Datetime from 'react-datetime'
import Input from 'components/FormElements/Input'
import TextArea from 'components/FormElements/TextArea'
import SelectField from 'components/FormElements/SelectField'
import SharedInputs from '../SharedInputs'
import LocationMap from '../LocationMap'

const Cpd = (props) => {
  const { onChangeInput, data } = props // TODO - use onChangeFile when putting back input file
  const optionsType = [
    {value: 'Formal', label: 'Formal'},
    {value: 'Informal', label: 'Informal'}
  ]
  const inputProps = {
    placeholder: 'DD/MM/YYYY'
  }
  const dateFromValue = (data.award_date_from) ? moment(data.award_date_from) : ''
  const dateToValue = (data.award_date_to) ? moment(data.award_date_to) : ''

  return (
    <form>
      <Input name="name" value={data.name} label="Name" onChange={onChangeInput} />
      <TextArea name="description" defaultValue={data.description} label="Description" onChange={onChangeInput} />
      <div className="row">
        <div className="col-md-6">
          <SelectField
            name="select-cpd-type"
            label="CPD Type"
            placeholder="Choose Type"
            value={data.award_cpd_type}
            options={optionsType}
            onChange={(obj) => {
              onChangeInput({
                target: {
                  name: 'award_cpd_type',
                  value: (obj) ? obj.value : ''
                }
              })
            }}
          />
        </div>
        <div className="col-md-6">
          <Input name="award_cpd_credits" value={data.award_cpd_credits} label="CPD Credits" onChange={onChangeInput} />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Input name="award_level" value={data.award_level} label="Level" onChange={onChangeInput} />
        </div>
        {/*
        <div className="col-md-6">
          <div className="form-group">
            <label>File</label>
            <input
              type="file"
              name="award_file"
              onChange={onChangeFile}
            />
          </div>
        </div>
        */}
      </div>

      <div className="row">
        <div className="col-md-6">
          <Input name="award_location" value={data.award_location} label="Location" onChange={onChangeInput} />
        </div>
        <div className="col-md-6">
          <Input name="award_duration" value={data.award_duration} label="Duration" onChange={onChangeInput} />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>Date From</label>
            <Datetime
              name="award_date_from"
              value={dateFromValue}
              dateFormat="DD/MM/YYYY"
              inputProps={inputProps}
              timeFormat={false}
              onChange={(date) => {
                if (date && date.format) {
                  onChangeInput({
                    target: {
                      name: 'award_date_from',
                      value: date.format('YYYY-MM-DD')
                    }
                  })
                }
              }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Date To</label>
            <Datetime
              name="award_date_to"
              value={dateToValue}
              dateFormat="DD/MM/YYYY"
              inputProps={inputProps}
              timeFormat={false}
              onChange={(date) => {
                if (date && date.format) {
                  onChangeInput({
                    target: {
                      name: 'award_date_to',
                      value: date.format('YYYY-MM-DD')
                    }
                  })
                }
              }}
            />
          </div>
        </div>
      </div>

      <SharedInputs onChangeInput={onChangeInput} data={data} />
      <LocationMap onChangeInput={onChangeInput} data={data}/>
    </form>
  )
}

Cpd.propTypes = {
  data: PropTypes.object,
  onChangeInput: PropTypes.func.isRequired
  // onChangeFile: PropTypes.func.isRequired
}

export default Cpd
