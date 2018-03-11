import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import FormerNames from './FormerNames'

describe('containers/SettingsAccount/components/FormerNames', () => {
  const props = {
    user: {
      former_names: [
        {first_name: 'jane', last_name: 'doe', start_date: '1990-01-01', end_date: '2016-01-01'}
      ]
    },
    save: jest.fn(),
    pending: false
  }

  const newName = {
    first_name: 'John',
    last_name: 'Doe',
    start_date: '2015-10-30',
    end_date: '2016-09-01'
  }

  describe('when first render', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <FormerNames {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when all inputs are invalid', () => {
    it('renders correctly', () => {
      const wrapper = shallow(
        <FormerNames {...props} />
      )
      wrapper.find('button').simulate('click', {preventDefault: jest.fn()})
      const tree = renderer.create(
        wrapper.instance().render()
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  // skip - this fails when running on AWS machine :S
  xdescribe('when end_date is before start_date', () => {
    it('renders correctly', () => {
      const wrapper = shallow(
        <FormerNames {...props} />
      )
      wrapper.setState({
        first_name: 'John',
        last_name: 'Doe',
        end_date: '2016-09-01',
        start_date: '2016-10-30'
      })
      wrapper.find('button').simulate('click', {preventDefault: jest.fn()})
      const tree = renderer.create(
        wrapper.instance().render()
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when all inputs are valid', () => {
    it('called props.save correctly', () => {
      const wrapper = shallow(
        <FormerNames {...props} />
      )
      wrapper.setState(newName)
      wrapper.find('button').simulate('click', {preventDefault: jest.fn()})

      expect(props.save).toHaveBeenCalledWith({
        former_names: [
          props.user.former_names[0],
          newName
        ]
      })
    })
  })

  describe('componentWillReceiveProps', () => {
    describe('when saving is successful', () => {
      let wrapper
      beforeEach(() => {
        wrapper = shallow(
          <FormerNames {...props} />
        )
        jest.spyOn(wrapper.instance(), 'notifyFn').mockImplementation(function() {})
        jest.spyOn(wrapper.instance(), 'resetForm')
        wrapper.setState({saving: true}, function() {
          wrapper.setProps({
            saveErrorMsg: null
          })
        })
      })

      it('calls notifyFn correctly', () => {
        expect(wrapper.instance().notifyFn).toHaveBeenCalledWith(expect.any(String), 'success')
      })

      it('calls resetForm correctly', () => {
        expect(wrapper.instance().resetForm).toHaveBeenCalled()
      })
    })

    describe('when saving is not successful', () => {
      let wrapper
      beforeEach(() => {
        wrapper = shallow(
          <FormerNames {...props} />
        )
        jest.spyOn(wrapper.instance(), 'notifyFn').mockImplementation(function() {})
        wrapper.setState({saving: true}, function() {
          wrapper.setProps({
            saveErrorMsg: 'Error happened'
          })
        })
      })

      it('calls notifyFn correctly', () => {
        expect(wrapper.instance().notifyFn).toHaveBeenCalledWith('Error happened', 'error')
      })

      it('state.saving is set to false', () => {
        expect(wrapper.state('saving')).toEqual(false)
      })
    })
  })
})
