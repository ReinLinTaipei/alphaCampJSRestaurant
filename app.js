// require express module, express-handlebars module, json files
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const host = 'localhost' //'34.80.159.59'

// set handlebars engine, static path
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', require('./routes/home'))
app.use('/shops', require('./routes/restaurants'))

mongoose.connect(`mongodb://${host}/restaurant`, { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', error => {
  console.error(error)
})

db.once('open', () => {
  console.log('mongodb connection!')
})

app.listen(port, host, () => {
  console.log(`connecting port: ${host}:${port}`)
})
