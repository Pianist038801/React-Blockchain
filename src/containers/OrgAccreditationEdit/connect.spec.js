import { fetch } from 'containers/OrgAccreditationQRCode/reducer'
import { saveAccreditation } from 'containers/OrgAccreditations/reducer'
import { mapState, mapDispatch } from './index'

describe('containers/OrgAccreditationEdit/connect', () => {
  describe('mapState', () => {
    let state
    beforeEach(() => {
      state = {
        orgAccreditation: 'orgAccreditationObject'
      }
    })

    it('returns a correctly mapped state (1)', () => {
      expect(mapState(state)).toEqual({
        orgAccreditation: 'orgAccreditationObject'
      })
    })

    it('returns a correctly mapped state (2)', () => {
      expect(mapState({})).toEqual({
        orgAccreditation: {}
      })
    })
  })

  describe('mapDispatch', () => {
    it('returns correct functions', () => {
      expect(mapDispatch(() => {})).toEqual(expect.objectContaining({
        fetch: expect.any(Function),
        saveAccreditation: expect.any(Function)
      }))
    })

    it('calls "fetch" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.fetch('data')
      expect(spy).toHaveBeenCalledWith(fetch('data'))
    })

    it('calls "saveAccreditation" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.saveAccreditation('data')
      expect(spy).toHaveBeenCalledWith(saveAccreditation('data'))
    })
  })
})
