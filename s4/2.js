String.prototype.format = function (format) {
  let modified = this
  for (let i = 0; i < format.length; i++) {
    modified = modified.replace('{' + i +'}', format[i])
  }
  return modified
}

console.log('{0} is a {1}'.format(['andrei', 'teacher']))