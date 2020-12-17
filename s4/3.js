String.prototype.format = function (format) {
  let modified = this
  for (const prop in format) {
    modified = modified.replace('{' + prop +'}', format[prop])
  }
  return modified
}

console.log('{name} is a {role}'.format({ name: 'andrei', role: 'teacher' }))
