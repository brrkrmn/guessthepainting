const mongoose = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator");

const artworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

artworkSchema.plugin(uniqueValidator);
artworkSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  }
})

module.exports = mongoose.model('Artwork', artworkSchema)