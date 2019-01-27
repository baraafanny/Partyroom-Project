const express = require('express');

const { authenticate } = require('../controllers/auth');
const {
  createYoutubeQueue,
  getAllYoutubeQueues,
  findYoutubeQueue,
  updateYoutubeQueue,
  deleteYoutubeQueue,
} = require('../controllers/youtubequeue');

// get express Router instance
const router = express.Router();

// Routes for endings with /youtubequeue
// Create a youtubequeue
router.post('/', authenticate(), createYoutubeQueue);

// Get all the youtubequeues
router.get('/', authenticate(), getAllYoutubeQueues);

// Routes for endings with /youtubequeue/partyroom_id and /youtubequeue/youtubequeue_id
// Get youtubequeue with specific partyroom id
router.get('/partyroom_id', authenticate(), findYoutubeQueue);

// Update a youtubequeue's queue by specific partyroom id
router.put('/partyroom_id', authenticate(), updateYoutubeQueue);

// Delete youtubequeue by its id
router.delete('/youtubequeue_id', authenticate(), deleteYoutubeQueue);

module.exports = router;