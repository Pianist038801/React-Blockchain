import React from 'react'
import { shallow } from 'enzyme'
import ListItem from './ListItem'

describe('containers/OrgAccreditations/components/ListItem', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = {
      deleteAccreditation: jest.fn(),
      item: {
        id: 10,
        name: 'Blockchain',
        level: 'Level 1',
        enabled: 1,
        delivery_type: 'In a classroom',
        type: 'Certification'
      }
    }
    wrapper = shallow(
      <ListItem {...props} />
    )
  })

  describe('clicking delete button', () => {
    it('calls props.deleteAccreditation correctly', () => {
      wrapper.find('.red-btn.action-btn').simulate('click')
      expect(props.deleteAccreditation).toHaveBeenCalledWith(10)
    })
  })
})
