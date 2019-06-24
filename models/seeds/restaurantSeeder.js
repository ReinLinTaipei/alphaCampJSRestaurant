const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const data = require('../../restaurant.json')

mongoose.connect('mongodb://127.0.0.1/restaurant', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', error => {
  console.log(error)
})

db.once('open', () => {
  console.log('seeder connection!')
  data.results.forEach(info => {
    Restaurant.create({
      name: info.name,
      name_en: info.name_en,
      category: info.category,
      image: info.image,
      location: info.location,
      phone: info.phone,
      google_map: info.google_map,
      rating: info.rating,
      description: info.description
    })
  })
  console.log('seeder done!')
})
