import React from 'react';
import './App.css';
import Header from './Components/Header';
import Homepage from './pages/Homepage';
import Help from './pages/Help';
import AboutUs from './pages/AboutUs';
import Landing from './pages/Landing';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <div className='Outerbody'>
        <br />
        <br />
        <br />
        <br />
        {/* {getPage()} */}
        {/*  */}
        {/*  */}

        <Router>
          <div className='App'>
            <Header />

            <Switch>
              <Route exact path='/app'>
                <Homepage />
              </Route>
              <Route exact path='/'>
                <Landing />
              </Route>
              <Route exact path='/about'>
                <AboutUs />
              </Route>
              <Route exact path='/help' component={Help}></Route>

              {/* <Route path="/signup" component={SignUp}></Route>
              <Route path="/signin" component={SignIn}></Route>
              <Route component={ErrorNotFound}></Route> */}
            </Switch>
          </div>
        </Router>

        {/*  */}
        {/*  */}
      </div>
    </div>
  );
}

export default App;
