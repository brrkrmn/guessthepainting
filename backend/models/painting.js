const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const hintSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  }
})

const paintingSchema = new mongoose.Schema({
  _id: {
    type: Number
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  hints: {
    type: [hintSchema],
    validate: {
      validator: function (array) {
        return array.length === 5;
      },
      message: 'Hints array must have 5 items'
    },
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  }
})

paintingSchema.plugin(uniqueValidator)
paintingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // returnedObject.id = returnedObject._id.toString()
    // delete returnedObject._id
    delete returnedObject._v
  }
})

module.exports = mongoose.model('Painting', paintingSchema)