const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  favoriteAnimal: { type: String, required: true },
});

module.exports = mongoose.model('MongoUser', UserSchema);