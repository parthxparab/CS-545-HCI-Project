import React from 'react';
import './App.css';
import Header from './Components/Header';
import Homepage from './pages/Homepage';
import Help from './Components/Help';

function App(props) {
	const [renderOpen, setRenderOpen] = React.useState('');
	console.log(renderOpen);

	return (
		<div className='Outerbody'>
			<Header setOpen={setRenderOpen} />
			<br />
			<br />
			<br />
			<br />
			{renderOpen === 'Help' ? <Help /> : <Homepage />}
		</div>
	);
}

export default App;
