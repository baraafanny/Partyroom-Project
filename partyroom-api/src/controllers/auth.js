const { Router } = require('express');
const passport = require('../../config/passport');

exports.authenticate = () => {
  const router = Router();
  router.use(passport.authenticate('jwt', { session: false }));

  return router;
};

