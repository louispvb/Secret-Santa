const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  google: {id: String, token: String, name: String, email: String},
});

UserSchema.index({'google.id': 1});

const User = mongoose.model('User', UserSchema);

module.exports = User;
