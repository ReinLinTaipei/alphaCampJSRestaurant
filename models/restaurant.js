const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_en: { type: String },
  category: { type: String },
  image: { type: String },
  location: {
    type: String,
    required: true
  },
  phone: { type: String },
  google_map: { type: String },
  rating: { type: Number },
  description: { type: String }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)
