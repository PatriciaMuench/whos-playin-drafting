import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
// import Bands from './bands';
// import Venues from './venues';
import './App.css';

class Home extends Component {
  render() {
    return (
      // note: I don't know if forceRefresh is desirable here, but I also don't know why things weren't rerendering on link clicks
      <Router forceRefresh>
        <div className="App-header">
          <h1 className="main">Who's Playin'</h1>
        {/* </div> */}
          {/* <div className="App-body">  */}
          <p className="main">
            Find live music events organized by venue, band, or location
          </p>
          {/* <div className="App-body"> */}
            <span><Link to="/bands">Bands</Link> &nbsp; <Link to="/venues">Venues</Link></span>

            {/* <Route path="/bands" component={Bands}/> */}
          {/* </div> */}
        </div>
      </Router>
    );
  }
}

export default Home;