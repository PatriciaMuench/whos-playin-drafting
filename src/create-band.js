// currently uncertain if I even want this to be a separate file (and if I like this name, etc), of course...

import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from './android-chrome-512x512-copy.png';
import './App.css';

// should it be a class??.....

class CreateBand extends Component {

  render() {
    return (
      <Router forceRefresh>
        <div className="App-header">
          <span><img src={logo} alt="logo" className="logo" height="70" width="70" /><Link to="/"><big>Who's Playin'</big></Link> &nbsp; <Link to="/bands">Bands</Link> &nbsp; <Link to="/venues">Venues</Link></span>
          <h2 className="main">Create a New Band</h2>
          
        </div>
      </Router>
    )
  }

}

export default CreateBand;