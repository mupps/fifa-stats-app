const { Schema, model } = require('mongoose')

const favoritesSchema = new Schema({
  favoritesID: { type: String, required: true, unique: true },
  favoritesName: { type: String, required: true }
});
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [favoritesSchema]
})

module.exports = model('User', userSchema)
