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
        <div>
          <p>create a new band</p>
        </div>
      </Router>
    )
  }

}

export default CreateBand;