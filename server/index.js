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

	{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
);

//req, what you get fro the frontend.
//res, what you send.
app.post('/addFriend', async (req, res) => {
	const name = req.body.name; //accessing name:name & age:age in Axios.post()
	const age = req.body.age;

	const friend = new FriendModel({name: name, age: age}); //not inserted into DB yet
	await friend.save(); //using async to wait for friend!
	res.send(friend);
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

//.put() to update stuff
app.put('/update', async (req, res) => {
	const newAge = req.body.newAge;
	const id = req.body.id;

	try {
		await FriendModel.findById(id, (error, friendToUpdate) => {
			friendToUpdate.age = Number(newAge);
			friendToUpdate.save();
		});
	} catch (error) {
		console.log(error);
	}
	res.send('Updated!!!');
});

app.delete('/delete/:id', async (req, res) => {
	const id = req.params.id;
	await FriendModel.findByIdAndRemove(id).exec();
	res.send('item deleted!!!');
});

app.listen(3001, () => {
	console.log('you care connected!!!');
});
