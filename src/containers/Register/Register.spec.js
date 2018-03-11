import React from 'react'
import { shallow } from 'enzyme'
import { ROUTE_URL, STORAGE_KEY, getApiUrl } from 'containers/constants'
import Technojobs from './components/Technojobs'
import Register from './index'

describe('<Register />', () => {
  let wrapper
  let pushFn

  describe('default registration', () => {
    beforeEach(() => {
      const match = {
        params: {}
      }
      pushFn = jest.fn()
      const props = {
        match,
        history: {
          push: pushFn
        }
      }

      wrapper = shallow(
        <Register {...props} />
      )

      jest.spyOn(wrapper.instance(), 'notifyFn').mockImplementation(function() {})
    })

    it('renders correct title', () => {
      expect(wrapper.find('.Login-title').text()).toEqual('Create an account')
    })

    it('does not render <Technojobs />', () => {
      expect(wrapper.find(Technojobs).length).toEqual(0)
    })

    describe('navigateToTerms', () => {
      it('goes to terms page', () => {
        wrapper.instance().navigateToTerms()
        expect(pushFn).toHaveBeenCalledWith(ROUTE_URL.terms)
      })
    })

    describe('when state.showSuccess is true', () => {
      beforeEach(() => {
        wrapper.setState({ showSuccess: true })
      })

      it('calls sessionStorage.removeItem', () => {
        expect(window.sessionStorage.removeItem).toHaveBeenCalledWith(STORAGE_KEY.register)
      })

      it('renders correctly', () => {
        expect(wrapper.find(`Link [to="${ROUTE_URL.login}"]`).length).toEqual(1)
        expect(wrapper.find('.block-link').text()).toEqual('Resend confirmation email')
      })
    })

    describe('resendConfirmation', () => {
      describe('when server returns "success"', () => {
        beforeEach(() => {
          jest.spyOn(window, 'fetch').mockImplementation(function() {
            return Promise.resolve({
              json: () => ({
                status: 'success'
              })
            })
          })

          wrapper.setState({
            email: 'jane.doe@appliedblockchain.com'
          })

          wrapper.instance().resendConfirmation()
        })

        afterEach(() => {
          window.fetch.mockRestore()
        })

        it('makes the correct request', () => {
          expect(window.fetch)
            .toHaveBeenCalledWith(
              getApiUrl('userResendConfirmation'),
              expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({email: 'jane.doe@appliedblockchain.com'})
              })
            )
        })

        it('show success notification', () => {
          expect(wrapper.instance().notifyFn)
            .toHaveBeenCalledWith(expect.any(String), 'success')
        })
      })
    })

    describe('showAgeRestriction', () => {
      it('shows correct notification', () => {
        wrapper.instance().showAgeRestriction()
        expect(wrapper.instance().notifyFn)
          .toHaveBeenCalledWith(expect.stringContaining('Providing your date of birth'), 'warning')
      })
    })

    describe('showPasswordRequirements', () => {
      it('shows correct notification', () => {
        wrapper.instance().showPasswordRequirements()
        expect(wrapper.instance().notifyFn)
          .toHaveBeenCalledWith(expect.stringContaining('password must be at least 8'), 'warning')
      })
    })

    describe('checkAge', () => {
      it('returns true ( age < 13 )', () => {
        expect(wrapper.instance().checkAge('2014-11-11'))
          .toEqual(true)
      })

      it('returns false ( age > 13 )', () => {
        expect(wrapper.instance().checkAge('2003-11-11'))
          .toEqual(false)
      })
    })

    describe('handleChange', () => {
      it('set this.dob correctly', () => {
        wrapper.instance().handleChange('2003', 'year')
        wrapper.instance().handleChange({ value: '11' }, 'month')
        wrapper.instance().handleChange({ day: '05' }, 'days')
        expect(wrapper.instance().dob).toEqual('2003-11-05')
      })
    })

    describe('resetForm', () => {
      it('sets state and this.dob correctly', () => {
        wrapper.instance().resetForm()
        expect(wrapper.instance().dob).toEqual('')
        expect(wrapper.instance().state).toEqual(expect.objectContaining({
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          agreed: false
        }))
      })
    })

    describe('isFormValid', () => {
      const validData = {
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane@appliedblockchain.com',
        password: 'Password190',
        days: {
          day: '05'
        },
        year: '2003',
        month: {
          value: '11'
        },
        agreed: true
      }

      it('returns all inputs are mandatory', () => {
        const data = wrapper.instance().isFormValid()
        expect(data).toEqual(expect.objectContaining({
          inValidFields: expect.any(Array),
          message: expect.stringContaining('mandatory'),
          isValid: false
        }))
      })

      it('returns email is invalid', () => {
        wrapper.setState({
          ...validData,
          email: 'jane.com'
        })
        const data = wrapper.instance().isFormValid()
        expect(data).toEqual(expect.objectContaining({
          inValidFields: ['email'],
          message: expect.stringContaining('valid email'),
          isValid: false
        }))
      })

      it('returns age is invalid', () => {
        wrapper.setState({
          ...validData,
          year: '2014'
        })
        wrapper.instance().dob = '2014-11-05'
        const data = wrapper.instance().isFormValid()
        expect(data).toEqual(expect.objectContaining({
          inValidFields: ['year', 'days', 'month'],
          message: expect.stringContaining('13 years'),
          isValid: false
        }))
      })

      it('returns T&Cs invalid', () => {
        wrapper.setState({
          ...validData,
          agreed: false
        })
        wrapper.instance().dob = '2004-11-05'
        const data = wrapper.instance().isFormValid()
        expect(data).toEqual(expect.objectContaining({
          inValidFields: ['agreed'],
          message: expect.stringContaining('terms of use'),
          isValid: false
        }))
      })

      it('returns valid', () => {
        wrapper.setState(validData)
        wrapper.instance().dob = '2004-11-05'
        const data = wrapper.instance().isFormValid()
        expect(data).toEqual({ isValid: true })
      })
    })

    describe('onSubmit', () => {
      describe('when all inputs are valid', () => {
        it('sends request to the server', () => {
          // setup
          jest.spyOn(wrapper.instance(), 'isFormValid').mockImplementation(function() {
            return { isValid: true }
          })
          jest.spyOn(window, 'fetch')
          wrapper.instance().onSubmit({
            preventDefault: jest.fn()
          })
          // assertion
          expect(window.fetch)
            .toHaveBeenCalledWith(
              getApiUrl('user'),
              expect.objectContaining({
                method: 'POST',
                body: expect.any(String)
              })
            )
          // teardown
          window.fetch.mockRestore()
          wrapper.instance().isFormValid.mockRestore()
        })
      })

      describe('when there is a validation error', () => {
        it('shows error notification', () => {
          // setup
          jest.spyOn(wrapper.instance(), 'isFormValid').mockImplementation(function() {
            return { isValid: false, message: 'hello error' }
          })
          jest.spyOn(window, 'fetch')
          wrapper.instance().onSubmit({
            preventDefault: jest.fn()
          })
          // assertion
          expect(window.fetch).not.toHaveBeenCalled()
          expect(wrapper.instance().notifyFn)
            .toHaveBeenCalledWith('hello error', 'error')
          // teardown
          window.fetch.mockRestore()
          wrapper.instance().isFormValid.mockRestore()
        })
      })
    })
  })

  describe('Technojobs registration', () => {
    beforeEach(() => {
      const match = {
        params: {
          technojobsId: 'technojobsId',
          technojobsHash: 'technojobsHash'
        }
      }
      wrapper = shallow(
        <Register match={match} />
      )
    })

    it('renders correct title', () => {
      expect(wrapper.find('.Login-title').text()).toEqual('Create an account')
    })

    it('renders <Technojobs />', () => {
      expect(wrapper.find(Technojobs).length).toEqual(1)
    })
  })
})
