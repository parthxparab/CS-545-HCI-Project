import React from 'react';
import './App.css';
import Header from './Components/Header';
import Homepage from './pages/Homepage';
import Help from './pages/Help';
import AboutUs from './pages/AboutUs';

function App(props) {
  const [renderOpen, setRenderOpen] = React.useState('Home');

  const getPage = () => {
    if (renderOpen === 'Home') {
      return <Homepage />;
    } else if (renderOpen === 'Help') {
      return <Help />;
    } else if (renderOpen === 'AboutUs') {
      return <AboutUs />;
    }
  };

  return (
    <div>
      <div className='Outerbody'>
        <Header setOpen={setRenderOpen} />
        <br />
        <br />
        <br />
        <br />
        {getPage()}
      </div>
    </div>
  );
}

export default App;
