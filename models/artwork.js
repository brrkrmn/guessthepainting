const mongoose = require('mongoose')

const artworkSchema = new mongoose.Schema({
  _id: {
    type: Number
  },
  title: {
    type: String,
    required: true,
  }
})

artworkSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  }
})

module.exports = mongoose.model('Artwork', artworkSchema)