const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// YoutubeQueue Schema, room_id is "foreign key" to PartyRoom Schemas id
// room_id need to be unique here because there is only one queue per Partyroom
const YoutubeQueueSchema = new Schema({
	room_id: { type: Schema.Types.ObjectId, ref: 'PartyRoom', required: [true, 'No partyroom id specified'], unique: true },
	queue: [{
	    video_id: {
	      type: String, required: [true, 'No video id specified'],
	    },
	    name: { type: String, required: [true, 'No name specified'] },
	    duration: { type: Number, required: [true, 'No duration specified'] },
	    current_time: { type: Number },
  }],
});

module.exports = mongoose.model('YoutubeQueue', YoutubeQueueSchema);