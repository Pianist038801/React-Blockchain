window.localStorage = {
  setItem: (item) => (item),
  getItem: jest.fn()
}

window.sessionStorage = {
  setItem: (item) => (item),
  getItem: jest.fn(),
  removeItem: jest.fn()
}

window.google = {
  maps: {
    Animation: {
      DROP: 'DROP'
    },
    Circle: function() {
      return {
        bindTo: jest.fn(),
        setRadius: jest.fn()
      }
    },
    event: {
      addListener: jest.fn()
    },
    Geocoder: jest.fn(),
    Map: function() {
      return {
        setCenter: jest.fn()
      }
    },
    Marker: function() {
      return {
        addListener: jest.fn(),
        setPosition: jest.fn()
      }
    },
    places: {
      Autocomplete: jest.fn(function() {
        return {
          addListener: jest.fn()
        }
      })
    }
  }
}

const xhrMockClass = {
  send: jest.fn(),
  open: jest.fn(),
  abort: jest.fn(),
  setRequestHeader: jest.fn()
}
window.XMLHttpRequest = jest.fn(function() {
  return xhrMockClass
})

jest.mock('react-datetime', () => 'DateTimeMock')
jest.mock('react-pdf', () => ({
  Document: () => 'Document',
  Page: () => 'Page'
}))
