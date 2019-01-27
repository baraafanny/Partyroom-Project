const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../../config/main');

// Register new users, when trying to save a new user it will go to the pre save func in user model
// where its password will be encrypted
exports.createUser = (req, res) => {
  // Checks so that the parameters required are there
  if (!req.body.username) {
    return res.status(400).json({ status: 400, message: 'Please enter a username too register!' });
  }
  if (!req.body.password) {
    return res.status(400).json({ status: 400, message: 'Please enter a password too register!' });
  }
  const newUser = new User({
    local: {
      username: req.body.username,
      password: req.body.password,
    },
  });
  // Attempt to save new user, password will be encrypted via the pre-hook in user model.
  newUser.save((err) => {
    if (err) {
      return res.status(400).json({ status: 400, message: 'That username already exists.' });
    }
    return res.status(200).json({ status: 200, message: 'Successfully created new user.' });
  });
};

// Actual authentication route, authenticate the user and get a json webtoken in return.
exports.authUser = (req, res) => {
  // Find a user with the same username as the input.
  User.findOne({
    'local.username': req.body.username,
  }, (err, user) => {
    if (err) throw err;

    if (!user) res.status(401).json({ status: 401, message: 'Authentication failed. User not found.' });
    else {
      // Check if password matches, with comparePassword func in user model.
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          // Create the token
          const payload = {
            exp: 1008000000,
            id: user._id,
            scope: '',
          };
          const token = jwt.sign(payload, config.secret);
          return res.status(200).json({ status: 200, token });
        }
        return res.status(400).json({ status: 401, message: 'Authentication failed. Password did not match.' });
      });
    }
  });
};

// Protect dashboard route with JWT
exports.protectDashboard = (req, res) => {
  res.send(`It worked! User id is: ${req.user.id}.`);
};

// Get all the Users
exports.getAllUsers = (req, res) => {
  return User.find()
    .select('local.username')
    .exec((err, users) => {
      if (err) return res.status(400).json({ status: 400, message: 'There is no current users.' });

      return res.status(200).json(users.map(user => ({ username: user.local.username, _id: user._id })));
    });
};

// Find user with specific id, handles so that the password does not come in the returned json
exports.findUser = (req, res) => {
  return User.findById(req.query.user_id)
    .select('-local.password')
    .then((user) => {
      if (user !== null) return res.status(200).json({ status: 200, user });
    })
    .catch((err) => {
      return res.status(400).json({ status: 400, message: ` No user found, ${err}.` });
    });
};

// Delete user by id
exports.deleteUser = (req, res) => {
  return User.remove({
    _id: req.query.user_id,
  }, (err) => {
    if (err) return res.status(400).json({ status: 400, message: 'Could not find user too delete.' });

    return res.status(200).json({ message: 'Successfully deleted.' });
  });
};