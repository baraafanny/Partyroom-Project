const express = require('express');
const { authenticate } = require('../controllers/auth');
const passport = require('passport');

const router = express.Router();

router.get('/', passport.authenticate('facebook'));

router.get('/callback', passport.authenticate('facebook', { successRedirect: '/profile', failureRedirect: '/' }));

module.exports = router;
