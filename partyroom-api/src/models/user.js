const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

// User Schema, a users username is unique which we can see here
// Facebook object is for facebook users and local for local users
const UserSchema = new Schema({
  local: {
    username: {
      type: String, lowercase: true, unique: true,
    },
    password: { type: String },
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
});

// Save the users hashed password, pre for doing this before saving user pass
UserSchema.pre('save', function preSavePassword(next) {
  const user = this;

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.local.password, salt, (err, hash) => {
        if (err) return next(err);
        user.local.password = hash;
        return next();
      });

      return null;
    });
  } else {
    return next();
  }
});

// Comparing passwords
UserSchema.methods.comparePassword = function compareFunc(pw, cb) {
  bcrypt.compare(pw, this.local.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
