import React from 'react'
import renderer from 'react-test-renderer'
import FormerNamesList from './FormerNamesList'

describe('containers/SettingsAccount/components/FormerNamesList', () => {
  const props = {
    user: {
      former_names: [
        {first_name: 'jane', last_name: 'doe', start_date: '1990-01-01', end_date: '1997-01-01'},
        {first_name: 'john', last_name: 'doe', start_date: '1997-02-01', end_date: '2016-01-01'}
      ]
    },
    remove: jest.fn(),
    pending: false
  }

  describe('when former_names is not empty', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <FormerNamesList {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when former_names is empty', () => {
    it('renders correctly', () => {
      const props2 = {
        ...props,
        user: {
          former_names: []
        }
      }
      const tree = renderer.create(
        <FormerNamesList {...props2} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
