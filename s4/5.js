function sampleFunction(a, b, c) {
  for (let i = 0; i < 100000; i++) {
    console.log(a + b + c + i)
  }
}

function timed(f) {
  return function (...args) {
    const before = Date.now()
    const result = f(...args)
    const after = Date.now()
    console.log(`i took ${after - before}ms to execute`)
    return result
  }
}

const timedSampleFunction = timed(sampleFunction)

timedSampleFunction(1, 2 ,3)