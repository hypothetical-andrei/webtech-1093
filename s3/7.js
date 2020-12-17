const sampleArray = [1,2,3,4,5,6]

const samplePredicate = (e) => e > 3

const filter = (a, p) => {
  let result = []
  for (const item of a) {
    if (p(item)){
      result.push(item)
    }
  }
  return result
}

console.log(filter(sampleArray, samplePredicate))
// [4,5,6]
console.log(filter(['cat', 'bear', 'dog', 'giraffe'], (e) => e.length > 3))

