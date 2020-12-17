const sampleString = 'i found {0} at the {1}'

const sampleFormat = ['a cat', 'petstore']

const formatString = (input, format) => {
  let modified = input
  for (let i = 0; i < format.length; i++) {
    modified = modified.replace('{' + i +'}', format[i])
  }
  return modified
}

console.log(formatString(sampleString, sampleFormat))
// i found a cat at the petstore