import React from 'react'
import { shallow } from 'enzyme'
import PersonalDetails from './PersonalDetails'
import FormerNamesList from '../FormerNamesList'
import FormerNames from '../FormerNames'

describe('containers/SettingsAccount/components/PersonalDetails', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = {
      user: {
        former_names: [
          {first_name: 'jane', last_name: 'doe', start_date: '1990-01-01', end_date: '2016-01-01'}
        ]
      },
      saveErrorMsg: null,
      updateUserProfile: jest.fn(),
      pending: false
    }

    wrapper = shallow(
      <PersonalDetails {...props} />
    )
  })

  it('renders <FormerNamesList />', () => {
    expect(wrapper.find(FormerNamesList).length).toEqual(1)
  })

  it('renders <FormerNames />', () => {
    expect(wrapper.find(FormerNames).length).toEqual(1)
  })

  describe('saveFormerNames', () => {
    it('calls props.updateUserProfile correctly', () => {
      wrapper.instance().saveFormerNames('data')
      expect(props.updateUserProfile).toHaveBeenCalledWith('data')
    })
  })

  describe('removeFormerNames', () => {
    it('called props.updateUserProfile correctly', () => {
      wrapper.instance().removeFormerNames(
        {first_name: 'jane', last_name: 'doe', start_date: '1990-01-01', end_date: '2016-01-01'}
      )
      expect(props.updateUserProfile).toHaveBeenCalledWith({former_names: []})
    })
  })
})
