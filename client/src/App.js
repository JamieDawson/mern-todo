import './App.css';
import {useState, useEffect} from 'react'; //useEffect: Call when rednered.
import Axios from 'axios';

function App() {
	const [name, setName] = useState('');
	const [age, setAge] = useState(0);
	const [listOfFriends, setListOfFriends] = useState([]);

	//name: name = name of variable - property [name, setName]
	const addFriend = () => {
		Axios.post('http://localhost:3001/addFriend', {name: name, age: age});
	};

	useEffect(() => {
		Axios.get('http://localhost:3001/read')
			.then((response) => {
				setListOfFriends(response.data);
			})
			.catch(() => {
				console.log('ERROR');
			});
	}, []);

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
			{listOfFriends.map((val) => {
				return (
					<div>
						{val.name} {val.age}
					</div>
				);
			})}
		</div>
	);
}

export default App;
