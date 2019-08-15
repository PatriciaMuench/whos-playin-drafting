import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from './android-chrome-512x512-copy.png';
import './App.css';

class Home extends Component {
  render() {
    return (
      // note: I don't know if forceRefresh is desirable here, but I also don't know why things weren't rerendering on link clicks
      <Router forceRefresh>
        <div className="App-header">
          <h1 className="main"><img src={logo} alt="logo" className="logo" height="100" width="100" />Who's Playin'</h1>
          <p className="main">
            Find live music events organized by venue, band, or location
          </p>
          <span><Link to="/bands">Bands</Link> &nbsp; <Link to="/venues">Venues</Link></span>
        </div>
      </Router>
    );
  }
}

export default Home;