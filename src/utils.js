const convert24To12Hrs = time24 => {
  var ts = time24
  var H = +ts.substr(0, 2)
  var h = H % 12 || 12
  h = h < 10 ? '0' + h : h
  var ampm = H < 12 ? ' AM' : ' PM'
  return h + ts.substr(2, 3) + ampm
}

export { convert24To12Hrs }
