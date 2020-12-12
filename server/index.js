const express = require('express');
const app = express();
const mongoose = require('mongoose');
const FriendModel = require('./models/Friends'); //getting the model
const cors = require('cors');
//cors: Library to connect frontend to backend.
app.use(cors());
app.use(express.json()); //middleware

//Database connection
mongoose.connect(
	'mongodb://localhost:27017/tutorialmern?readPreference=primary&appname=MongoDB%20Compass&ssl=false',

	{useNewUrlParser: true}
);

//req, what you get fro the frontend.
//res, what you send.
app.post('/addFriend', async (req, res) => {
	const name = req.body.name; //accessing name:name & age:age in Axios.post()
	const age = req.body.age;

	const friend = new FriendModel({name: name, age: age}); //not inserted into DB yet
	await friend.save(); //using async to wait for friend!
	res.send('Success');
});

app.get('/read', async (req, res) => {
	FriendModel.find({}, (err, result) => {
		if (err) {
			res.send(err);
		} else {
			res.send(result);
		}
	});
});

app.listen(3001, () => {
	console.log('you care connected!!!');
});
