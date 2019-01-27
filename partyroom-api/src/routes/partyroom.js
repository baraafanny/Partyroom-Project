const express = require('express');

const { authenticate } = require('../controllers/auth');
const {
  createPartyRoom,
  getAllPartyRooms,
  findPartyRoom,
  updateGuestlist,
  deletePartyRoom,
} = require('../controllers/partyroom');

// get express Router instance
const router = express.Router();

// Routes for endings with /partyroom
// Create a partyroom
router.post('/', authenticate(), createPartyRoom);

// Get all the partyrooms
router.get('/', authenticate(), getAllPartyRooms);

// Routes for endings with /partyroom/partyroom_id.
// Get partyroom with specific id
router.get('/partyroom_id', authenticate(), findPartyRoom);

// Update partyroom by id
router.put('/partyroom_id', authenticate(), updateGuestlist);

// Delete partyroom by id
router.delete('/partyroom_id', authenticate(), deletePartyRoom);

module.exports = router;