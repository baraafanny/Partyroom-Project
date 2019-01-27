const PartyRoom = require('../models/PartyRoom');

// Create a PartyRoom
exports.createPartyRoom = (req, res) => {
  const { name } = req.body;
  const user = req.user.id;
  // Check all required fields and types
  if (!name) return res.status(400).json({ status: 400, message: 'Please enter a name too register!' });
  if (typeof name !== 'string') return res.status(400).json({ status: 400, message: 'Name is not a string.' });
  if (!user) return res.status(400).json({ status: 400, message: 'There is no user creating partyroom!' });
  if (typeof user !== 'string') return res.status(400).json({ status: 400, message: 'User is not a string.' });

  // set PartyRoom name etc, comes from request
  const partyroom = new PartyRoom(Object.assign(
    {},
    req.body,
    {
      created: {
        user,
      },
    },
  ));

  return partyroom.save((err) => {
    if (err) return res.status(400).json({ status: 400, message: 'Error saving new PartyRoom.' });

    return res.status(200).json({ message: 'New PartyRoom created!', _id: partyroom._id });
  });
};

// Get all the PartyRooms
exports.getAllPartyRooms = (req, res) => {
  return PartyRoom.find((err, partyrooms) => {
    if (err) return res.status(400).json({ status: 400, message: 'There is no partyrooms.' });

    return res.status(200).json(partyrooms);
  });
};

// Get PartyRoom with specific id
exports.findPartyRoom = (req, res) => {
  return PartyRoom.findById(req.query.partyroom_id, (err, partyroom) => {
    if (err) return res.status(400).json({ status: 400, message: 'Could not find partyroom.' });

    return res.status(200).json(partyroom);
  });
};

// Update PartyRoom guestlist by id
exports.updateGuestlist = (req, res) => {
  return PartyRoom.findById(req.query.partyroom_id, (err, partyroom) => {
    if (err) return res.status(400).json({ status: 400, message: 'Could not find partyroom too update.' });
    const { guests } = req.body;

    if (!guests) return res.status(400).json({ status: 400, message: 'Please provide a guestlist too update!' });
    Object.assign(partyroom, { guests: guests });
    return partyroom.save((err2) => {
      if (err2) return res.status(400).json({ status: 400, message: 'Could not save updated partyroom.' });

      return res.status(200).json({ message: `New partyroom guestlist was set` });
    });
  });
};

// Delete PartyRoom by id
exports.deletePartyRoom = (req, res) => {
  return PartyRoom.remove({
    _id: req.query.partyroom_id,
  }, (err) => {
    if (err) return res.status(400).json({ status: 400, message: 'Could not find partyroom too delete.' });

    return res.status(200).json({ message: 'Successfully deleted.' });
  });
};
