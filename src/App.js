import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './home';
import Bands from './bands';
import Band from './band';
import Venues from './venues';
import Venue from './venue';
import CreateBand from './create-band';
import CreateVenue from './create-venue';
import CreateEvent from './create-event';
import './App.css';

import LogRocket from 'logrocket';
LogRocket.init('0wdbdp/whos-playin-dev');

class App extends Component {

  render() {
    return (
      <Router>
        {/* (consider an enclosing div here for shared styling) */}
        {/* <div className="App"> */}
        {/* <div> */}
          <Route exact path="/" component={Home} />
          <Route exact path="/bands" component={Bands}/>
          {/* <Route path="/bands/:name" component={Band} /> */}
          <Route exact path="/bands/:name" component={Band} />          
          <Route exact path="/venues" component={Venues}/>
          <Route path="/venues/:name" component={Venue} />
          <Route exact path="/new-band" component={CreateBand} />
          <Route exact path="/new-venue" component={CreateVenue} />
          <Route exact path="/new-event" component={CreateEvent} />
        {/* </div> */}
      </Router>
    );
  }

}

export default App;
