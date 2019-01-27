const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// PartyRoom Schema, guests arrays indexes are "foreign key" to User Schemas id
const PartyRoomSchema = new Schema({
  name: {
    type: String,
    required: [true, 'No name specified'],
    unique: true
  },
  guests: [{ type: [Schema.Types.ObjectId], ref: 'User' }],
  created: {
    user: [{ type: Schema.Types.ObjectId, ref: 'User', required: [true, 'No user specified'] }], // FK to user
    date: { type: Date, default: Date.now, required: [true, 'No date specified'] },
  },
});

module.exports = mongoose.model('PartyRoom', PartyRoomSchema);