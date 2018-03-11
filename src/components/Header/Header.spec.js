import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'
import { ROUTE_URL } from 'containers/constants.js'
import Header from './Header'

describe('<Header />', () => {
  let wrapper
  describe('when user is logged in', () => {
    beforeEach(() => {
      const user = {
        first_name: 'Jane',
        last_name: 'Doe',
        profile_image: '://profile_image'
      }
      const props = {
        user,
        token: 'token',
        isLoggedIn: true,
        editLabel: 'Edit',
        organisations: []
      }
      wrapper = mount(
        <Router>
          <Header {...props} />
        </Router>
      )
    })

    it('renders username', () => {
      expect(wrapper.find('.profile-header').text()).toContain('Hi, Jane')
    })

    it('logos link to the correct page', () => {
      expect(wrapper.find('.logo').find({href: ROUTE_URL.home}).length)
        .toEqual(1)
    })
  })

  describe('when user is logged out', () => {
    beforeEach(() => {
      const user = {first_name: 'Jane'}
      wrapper = mount(
        <Router>
          <Header user={user} isLoggedIn={false} organisations={[]} />
        </Router>
      )
    })

    it('does not render username', () => {
      expect(wrapper.find('.profile-header').length).toEqual(0)
    })

    it('logos link to the correct page', () => {
      expect(wrapper.find('.logo').find({href: ROUTE_URL.publicSiteHome}).length)
        .toEqual(1)
    })
  })
})
