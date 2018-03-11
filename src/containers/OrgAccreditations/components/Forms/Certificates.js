import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Datetime from 'react-datetime'
import Input from 'components/FormElements/Input'
import TextArea from 'components/FormElements/TextArea'
import SharedInputs from '../SharedInputs'
import LocationMap from '../LocationMap'

const Certificates = (props) => {
  const { onChangeInput, data } = props // TODO - use onChangeFile when putting back input file
  const inputProps = {
    placeholder: 'DD/MM/YYYY'
  }
  const dateValue = (data.award_date) ? moment(data.award_date) : ''

  return (
    <form>
      <Input name="name" value={data.name} label="Name" onChange={onChangeInput} />
      <TextArea name="description" defaultValue={data.description} label="Description" onChange={onChangeInput} />

      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>Date</label>
            <Datetime
              name="award_date"
              value={dateValue}
              dateFormat="DD/MM/YYYY"
              inputProps={inputProps}
              timeFormat={false}
              onChange={(date) => {
                if (date && date.format) {
                  onChangeInput({
                    target: {
                      name: 'award_date',
                      value: date.format('YYYY-MM-DD')
                    }
                  })
                }
              }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <Input name="award_level" value={data.award_level} label="Level" onChange={onChangeInput} />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Input name="award_grade" value={data.award_grade} label="Grade" onChange={onChangeInput} />
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

      <SharedInputs onChangeInput={onChangeInput} data={data} />
      <LocationMap onChangeInput={onChangeInput} data={data}/>
    </form>
  )
}

Certificates.propTypes = {
  data: PropTypes.object,
  onChangeInput: PropTypes.func.isRequired
  // onChangeFile: PropTypes.func.isRequired
}

export default Certificates
