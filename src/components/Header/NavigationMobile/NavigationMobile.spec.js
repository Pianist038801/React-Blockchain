import React from 'react'
import renderer from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import NavigationMobile from './NavigationMobile'

describe('components/Header/NavigationMobile', () => {
  const commonProps = {
    user: {
      first_name: 'Jane',
      last_name: 'Doe',
      biometrics_status: 'complete'
    },
    active: true,
    organisations: [{id: 12, name: 'Applied Blockhain Ltd'}],
    setMobileNavActive: jest.fn()
  }

  describe('when intelligentLink is valid', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        intelligentLink: 'http://google.co.uk'
      }

      const tree = renderer.create(
        <Router>
          <NavigationMobile {...props} />
        </Router>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when intelligentLink is false', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        intelligentLink: false
      }

      const tree = renderer.create(
        <Router>
          <NavigationMobile {...props} />
        </Router>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when user has no organisations', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        organisations: []
      }

      const tree = renderer.create(
        <Router>
          <NavigationMobile {...props} />
        </Router>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when active is false', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        active: false
      }

      const tree = renderer.create(
        <Router>
          <NavigationMobile {...props} />
        </Router>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when biometrics_status failed', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        user: {
          ...commonProps.user,
          biometrics_status: 'failed'
        }
      }

      const tree = renderer.create(
        <Router>
          <NavigationMobile {...props} />
        </Router>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
