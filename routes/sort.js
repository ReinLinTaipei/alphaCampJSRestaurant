const express = require('express')
const router = express.Router()
const Restaurants = require('../models/restaurant')

router.get('/:id', (req, res) => {
  console.log('sort', req.params)
  const type = req.params.id
  console.log(`sort type: ${type}`)
  Restaurants.find((err, restaurants) => {
    if (err) return console.error(err)
    switch (type) {
      case 'asc':
        restaurants.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'desc':
        restaurants.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'category':
        restaurants.sort((a, b) => a.category.localeCompare(b.category))
        break
      case 'location':
        restaurants.sort((a, b) => a.location.localeCompare(b.location))
        break
    }
    console.log(`${type} sorted`, restaurants.map(store => store.name))
    res.render('index', { stores: restaurants })
  })
})

module.exports = router
