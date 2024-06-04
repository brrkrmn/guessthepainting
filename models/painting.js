const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const paintingSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  hints: {
    type: [String],
    validate: {
      validator: function (array) {
        return array.length <= 5;
      },
      message: (props) => `${props.value.length} exceeds the limit of 5 hints.`,
    },
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

paintingSchema.plugin(uniqueValidator)
paintingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  }
})

module.exports = mongoose.model('Painting', paintingSchema)