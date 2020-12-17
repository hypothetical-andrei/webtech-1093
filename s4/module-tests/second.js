const state = require('./state')

const doStuff = () => {
  const value = state.getValue('somekey')
  console.log(`value from state was ${value}`)
}

module.exports = {
  doStuff
}