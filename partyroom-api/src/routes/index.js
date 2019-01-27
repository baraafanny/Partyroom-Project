const express = require('express');
const user = require('./user');
const facebook = require('./facebookauth');
const partyroom = require('./partyroom');
const youtubequeue = require('./youtubequeue');
// get express Router instance
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
});
// Add the different route endings
router.use('/user', user);
router.use('/auth/facebook', facebook);
router.use('/partyroom', partyroom);
router.use('/youtubequeue', youtubequeue);

module.exports = router;
