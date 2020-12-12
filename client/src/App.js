import './App.css';
import {useState} from 'react';
import Axios from 'axios';

function App() {
	const [name, setName] = useState('');
	const [age, setAge] = useState(0);

	//name: name = name of variable - property [name, setName]
	const addFriend = () => {
		Axios.post('http://localhost:3001/addFriend', {name: name, age: age})
			.then(() => {
				alert('worked!');
			})
			.catch(() => {
				alert('failed');
			});
	};
	//test
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
		</div>
	);
}

export default App;
