// require express module, express-handlebars module, json files
const express = require('express')
const exphbs = require('express-handlebars')
const restaurants = require('./restaurant.json')
const app = express()
const port = 3000

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
  console.log(`restaurant_id:${req.params.restaurant_id}`)
  const restaurant = restaurants.results.find(
    restaurant =>
      restaurant.id.toString() === req.params.restaurant_id.toString()
  )
  res.render('show', { restaurant })
})

// search action on /views/index.handlebars
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  console.log(`keyword: ${keyword}`)
  const results = restaurants.results.filter(restaurant => {
    return (
      restaurant.name.toLowerCase().includes(keyword) ||
      restaurant.category.toLowerCase().includes(keyword)
    )
  })
  res.render('index', { restaurants: results, keyword })
})

app.listen(port, () => {
  console.log(`connecting port: ${port}`)
})
