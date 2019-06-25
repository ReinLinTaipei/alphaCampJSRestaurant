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

mongoose.connect(`mongodb://${host}/restaurant`, { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', error => {
  console.error(error)
})

db.once('open', () => {
  console.log('mongodb connection!')
})

const Restaurant = require('./models/restaurant')

// list restaurants on /views/index.handlebars
app.get('/', (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants })
  })
})

// show restaurant details on /views/show.handlebars
app.get('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    res.render('show', { restaurant })
  })
})

// edit page
app.get('/restaurants/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    res.render('edit', { restaurant })
  })
})

// edit action
app.post('/restaurant/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.name = req.body.name
    restaurant.category = req.body.category
    restaurant.location = req.body.location
    restaurant.phone = req.body.phone
    restaurant.description = req.body.description
    restaurant.save(err => {
      if (err) return console.err(err)
      res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})

app.post('/restaurant/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      res.redirect('/')
    })
  })
})

// search action on /views/index.handlebars
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)
    const results = restaurants.filter(restaurant => {
      return (
        restaurant.name.toLowerCase().includes(keyword) ||
        restaurant.category.toLowerCase().includes(keyword) ||
        restaurant.name_en.toLowerCase().includes(keyword)
      )
    })
    res.render('index', { restaurants: results, keyword })
  })
})

app.listen(port, host, () => {
  console.log(`connecting port: ${host}:${port}`)
})
