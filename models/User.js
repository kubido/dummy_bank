const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema({
  "user_id": {
    type: String,
    default: uuidv4()
  },
  "first_name": String,
  "last_name": String,
  "phone_number": {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    maxlength: 14,
  },
  "address": String,
  "pin": {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 12,
  },
  "created_date": {
    type: Date,
    default: new Date()
  }
})

UserSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Phone Number already registered'));
  } else {
    next(error);
  }
});
const User = mongoose.model('User', UserSchema)

module.exports = User