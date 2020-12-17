const sampleDictionary = ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog']

const sampleString = `
  best
  read
  on
  windy
  nights
`

const checkAcrostic = (input, dictionary) => {
  // let lines = input.split('\n')
  // let target = ''
  // for (const line of lines) {
  //   if (line.trim()) {
  //     target += line.trim()[0]
  //   }
  // }
  // return dictionary.indexOf(target) !== -1
  let target = input.split('\n').map(e => e.trim()).filter(e => e).reduce((a, e) => a + e[0], '')
  return dictionary.indexOf(target) !== -1
}

console.log(checkAcrostic(sampleString, sampleDictionary))