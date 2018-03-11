import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Datetime from 'react-datetime'
import Input from 'components/FormElements/Input'
import TextArea from 'components/FormElements/TextArea'
import SharedInputs from '../SharedInputs'
import LocationMap from '../LocationMap'

const Awards = (props) => {
  const { onChangeInput, data } = props
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
      </div>
      <SharedInputs onChangeInput={onChangeInput} data={data} />
      <LocationMap onChangeInput={onChangeInput} data={data}/>
    </form>
  )
}

Awards.propTypes = {
  data: PropTypes.object,
  onChangeInput: PropTypes.func.isRequired
}

export default Awards
