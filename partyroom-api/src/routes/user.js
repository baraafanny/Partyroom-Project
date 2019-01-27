const express = require('express');
const passport = require('passport');

// Bring in passport strategy
// require('../../config/passport')(passport);
const { authenticate } = require('../controllers/auth');

const {
  createUser,
  authUser,
  protectDashboard,
  getAllUsers,
  findUser,
  deleteUser,
} = require('../controllers/user');

// Get express Router instance
const router = express.Router();

// Routes for endings with /user
// Register new users
router.post('/register', /*authenticate(),*/ createUser);

// Actual authentication route, authenticate the user and get a json webtoken in return.
router.post('/authenticate', authUser);

// Protect dashboard route with JWT
router.get('/dashboard', authenticate(), protectDashboard);

// Get all the users
router.get('/', authenticate(), getAllUsers);

// Routes for endings with /user/user_id, by id.
// Get user with specific id
router.get('/user_id', authenticate(), findUser);

// Delete user by id
router.delete('/user_id', authenticate(), deleteUser);

module.exports = router;
