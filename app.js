// require express module, express-handlebars module, json files
const express = require('express')
const exphbs = require('express-handlebars')
const restaurants = require('./restaurant.json')
const app = express()
const port = 3000
const host = 'http://34.80.159.59'

// set handlebars engine, static path
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// list restaurants on /views/index.handlebars
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurants.results })
})

// show restaurant details on /views/show.handlebars
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurants.results.find(
    restaurant =>
      restaurant.id.toString() === req.params.restaurant_id.toString()
  )
  res.render('show', { restaurant })
})

// search action on /views/index.handlebars
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  const results = restaurants.results.filter(restaurant => {
    return (
      restaurant.name.toLowerCase().includes(keyword) ||
      restaurant.category.toLowerCase().includes(keyword) ||
      restaurant.name_en.toLowerCase().includes(keyword)
    )
  })
  res.render('index', { restaurants: results, keyword })
})

app.listen(port, host, () => {
  console.log(`connecting port: ${host}:${port}`)
})
