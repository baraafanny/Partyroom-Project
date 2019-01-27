const YoutubeQueue = require('../models/YoutubeQueue');

// Create a YoutubeQueue, room id is a required field
exports.createYoutubeQueue = (req, res) => {
  const { room_id, queue } = req.body;
  if (!room_id) return res.status(400).json({ status: 400, message: 'Please enter a room id too register!' });

  // set YoutubeQueue room_id, name etc, comes from request
  const youtubequeue = new YoutubeQueue(Object.assign(
    {},
    req.body,
  ));

  return youtubequeue.save((err) => {
    if (err) return res.status(400).json({ status: 400, message: 'Error saving new YoutubeQueue.' });

    return res.status(200).json({ message: 'New YoutubeQueue created!', _id: youtubequeue._id });
  });
};

// Get all the YoutubeQueues, find function gives us all queues in a big array
exports.getAllYoutubeQueues = (req, res) => {
  return YoutubeQueue.find((err, youtubequeues) => {
    if (err) return res.status(400).json({ status: 400, message: 'There is no youtubequeues.' });

    return res.status(200).json(youtubequeues);
  });
};

// Get YoutubeQueue with specific party room id
exports.findYoutubeQueue = (req, res) => {
  return YoutubeQueue.findOne({ room_id: req.query.partyroom_id }, (err, youtubequeue) => {
    if (err) return res.status(400).json({ status: 400, message: 'Could not find youtubequeue.' });

    return res.status(200).json(youtubequeue);
  });
};

// Update YoutubeQueue guestlist by party room id
exports.updateYoutubeQueue = (req, res) => {
  return YoutubeQueue.findOne({ room_id: req.query.partyroom_id }, (err, youtubequeue) => {
    if (err) return res.status(400).json({ status: 400, message: 'Could not find youtubequeue too update.' });
    const { queue } = req.body;
    if (!queue) return res.status(400).json({ status: 400, message: 'Please provide a queue too update!' });

    Object.assign(youtubequeue, { queue: queue });

    return youtubequeue.save((err2) => {
      if (err2) return res.status(400).json({ status: 400, message: 'Could not save updated youtubequeue.' });

      return res.status(200).json({ message: `New youtube queue was set` });
    });
  });
};

// Delete YoutubeQueue by id
exports.deleteYoutubeQueue = (req, res) => {
  return YoutubeQueue.remove({
    _id: req.query.youtubequeue_id,
  }, (err) => {
    if (err) return res.status(400).json({ status: 400, message: 'Could not find youtubequeue too delete.' });

    return res.status(200).json({ message: 'Successfully deleted.' });
  });
};