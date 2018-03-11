export const parseAwards = (allAwards) => {
  let obj = {}
  if (allAwards && allAwards.length) {
    allAwards.map((item) => {
      if (!obj[item.type]) {
        obj[item.type] = [item]
      } else {
        obj[item.type] = [...obj[item.type], item]
      }
      return item
    })
  }
  return obj
}

export const parseArrayToOptions = (array, hasValue) => {
  if (array && array.length) {
    return array.map((elem) => {
      return { text: hasValue ? elem.value1 : elem }
    })
  } else {
    return array
  }
}

export const parseResponse = (data, value) => {
  let obj = {}
  if (data && data.length) {
    data.forEach((item) => {
      if (!obj[item[value]]) {
        obj[item[value]] = obj[item[value]] + 1
      } else {
        obj[item[value]] = 0
      }
    })
    return parseArrayToOptions(Object.keys(obj).sort(function (a, b) { return obj[b] - obj[a] }))
  }
  return obj
}
