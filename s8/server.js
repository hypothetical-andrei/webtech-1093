const express = require('express')
const bodyParser = require('body-parser')
const kittenRouter = require('./routers/kitten-router')

const app = express()

app.locals.kittens = []

for (let i = 0; i < 100; i++) {
  app.locals.kittens.push({
    id: i, 
    name: 'kitten ' + i, 
    color: 'some color', 
    weight: i % 10
  })
}

app.use((req, res, next) => {
  console.log(`${req.url} was requested via ${req.method}`)
  next()
})

app.use(bodyParser.json())

app.use((req, res, next) => {
  if (req.headers['kitten-secret'] === 'supersecret') {
    next()
  } else {
    res.status(401).json({ message: 'you need the secret to proceed' })
  }
})

app.use('/kitten-api', kittenRouter)

app.listen(8080)