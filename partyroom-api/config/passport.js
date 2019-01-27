const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../src/models/user');
const config = require('./main');
const passport = require('passport');

const FacebookStrategy = require('passport-facebook').Strategy;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: config.secret,
  ignoreExpiration: true,
};

const facebookOptions = {
  clientID: 'secret',
  clientSecret: 'secret',
  callbackURL: 'http://localhost:8080/api/auth/facebook/callback',
};

// Checks the auth headers for json web tokens
const jwtStrategy = (new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  const { id, scope } = jwtPayload;
  const user = { id, scope };

  return done(null, user);
}));

// Facebook auth function
const authUser = (token, refreshToken, profile, done) => {
  User.findOne({ 'facebook.id': profile.id })
    .then((user) => {
      if (user !== null) return done(null, user);
      console.log(profile);
      const { id } = profile || {};

      return User.create({ id, token })
        .then(newUser => done(null, newUser));
    })
    .catch(done);
};

const facebookStrategy = new FacebookStrategy(facebookOptions, authUser);

passport.use(jwtStrategy);
passport.use(facebookStrategy);
module.exports = passport;
