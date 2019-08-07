import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Bands from './bands';
import './App.css';

class Home extends Component {
  render() {
    return (
      // note: I don't know if forceRefresh is desirable here, but I also don't know why things weren't rerendering on link clicks
      <Router forceRefresh>
        <div className="App-header">
          <h1>Who's Playin'</h1>
          <p>
            Find live music events organized by venue, band, or location
          </p>

          <Link to="/bands">Bands</Link>

          {/* <Route path="/bands" component={Bands}/> */}

        </div>
      </Router>
    );
  }
}

export default Home;