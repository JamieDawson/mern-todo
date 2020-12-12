const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		require: false,
	},
});

//'friends' is the name of the item in the database
//setting up the model
const FriendModel = mongoose.model('friends', FriendSchema);

module.exports = FriendModel;
