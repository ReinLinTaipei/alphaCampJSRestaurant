const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

// create new restaurant page
router.get('/create', (req, res) => {
  console.log('get create page')
  res.render('new')
})

// create action
router.post('/create', (req, res) => {
  console.log('post create page, ', req.body)
  const restaurant = req.body
  Restaurant.create(
    {
      name: restaurant.name.length == 0 ? 'undefined' : restaurant.name,
      category:
        restaurant.category.length == 0 ? 'undefined' : restaurant.category,
      location:
        restaurant.location.length == 0 ? 'undefined' : restaurant.location,
      phone: restaurant.phone.length == 0 ? 'undefined' : restaurant.phone,
      description:
        restaurant.description.length == 0
          ? 'undefined'
          : restaurant.description,
      image: restaurant.image.length == 0 ? 'undefined' : restaurant.image
    },
    err => {
      if (err) return console.error(err)
      res.redirect('/')
    }
  )
})
// show restaurant details
router.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    res.render('show', { restaurant })
  })
})

// edit page
router.get('/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    res.render('edit', { restaurant })
  })
})

// edit action
router.put('/:id', (req, res) => {
  console.error('edit action')
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.name = req.body.name
    restaurant.category = req.body.category
    restaurant.location = req.body.location
    restaurant.phone = req.body.phone
    restaurant.description = req.body.description
    restaurant.rating = req.body.rating
    restaurant.image = req.body.image
    restaurant.save(err => {
      if (err) return console.error(err)
      res.redirect(`/shops/${req.params.id}`)
    })
  })
})

// delete
router.delete('/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      res.redirect('/')
    })
  })
})

module.exports = router
