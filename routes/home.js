const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

// list all restaurants
router.get('/', (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { stores: restaurants })
  })
})

// search action on /views/index.handlebars
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)
    const results = restaurants.filter(restaurant => {
      return (
        restaurant.name.toLowerCase().includes(keyword) ||
        restaurant.category.toLowerCase().includes(keyword) ||
        (restaurant.name_en !== undefined &&
          restaurant.name_en.toLowerCase().includes(keyword))
      )
    })
    res.render('index', { restaurants: results, keyword })
  })
})

module.exports = router
