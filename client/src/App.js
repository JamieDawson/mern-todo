import './App.css';
import {useState, useEffect} from 'react'; //useEffect: Call when rednered.
import Axios from 'axios';

function App() {
	const [name, setName] = useState('');
	const [age, setAge] = useState(0);
	const [listOfFriends, setListOfFriends] = useState([]);

	//name: name = name of variable - property [name, setName]
	//.then() updates the page with the new name. THe .post adds it to the database
	const addFriend = () => {
		Axios.post('http://localhost:3001/addFriend', {name: name, age: age}).then(
			(response) => {
				setListOfFriends([
					...listOfFriends,
					{_id: response.data._id, name: name, age: age},
				]);
			}
		);
	};

	//update friend info on update button.
	const updateFriend = (id) => {
		const newAge = prompt('Enter new Age');
		Axios.put('http://localhost:3001/update', {newAge: newAge, id: id}).then(
			() => {
				setListOfFriends(
					listOfFriends.map((val) => {
						return val._id === id
							? {_id: id, name: val.name, age: newAge}
							: val;
					})
				);
			}
		);
	};

	//useEffect: Call when rednered.
	useEffect(() => {
		Axios.get('http://localhost:3001/read')
			.then((response) => {
				setListOfFriends(response.data);
				//	const update = prompt('Enter val: ');
				//	console.log(update);
			})
			.catch(() => {
				console.log('ERROR');
			});
	}, []);

	const deleteFriend = (id) => {
		Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
			setListOfFriends(
				listOfFriends.filter((val) => {
					return val._id !== id;
				})
			);
		});
	};

	return (
		<div className='App'>
			<div className='inputs'>
				<input
					type='text'
					placeholder='Friend Name!!!'
					onChange={(event) => {
						setName(event.target.value);
					}}
				></input>
				<input
					type='number'
					placeholder='Friend age!!!!!'
					onChange={(event) => {
						setAge(event.target.value);
					}}
				></input>
				<button onClick={addFriend}>Add Friend</button>
			</div>
			<div className='listOfFriends'>
				{listOfFriends.map((val) => {
					return (
						<div className='friendContainer'>
							<div className='friend'>
								<h3>Name: {val.name}</h3>
								<h3> Age:{val.age}</h3>
							</div>
							<button
								onClick={() => {
									updateFriend(val._id);
								}}
							>
								update
							</button>
							<button
								id='removeBtn'
								onClick={() => {
									deleteFriend(val._id);
								}}
							>
								Delete
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
