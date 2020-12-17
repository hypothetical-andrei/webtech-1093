let a = [1,2,3,4,5,6]

for (let elem of a) {
  if (elem > 3) {
    console.log(elem)
  }
}

for (let i = 0; i < a.length; i++) {
  if (a[i] > 3) {
    console.log(a[i])
  }
}

// let filteredArray = a.filter(e => e > 3)
// console.log(filteredArray)

let o = {
  name: 'some name',
  age: 'some age'
}


for (let prop in o) {
  console.log(o[prop])
}

// console.log(Object.keys(o))

let x = parseFloat('abcd')
console.log(typeof x)
if (isNaN(x)) {
  console.log('x is not a number')
}