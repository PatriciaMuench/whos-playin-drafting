import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import './App.css';

// (just copied in based on current state of Bands)

class Venues extends Component {

  state = {venues: []}

  componentWillMount() {
    fetch(`/venues`)
      .then(response => response.json())
      .then(response => this.setState({venues: response}))
      .catch(error => console.log(error));
  }

  render() {

    return(
      // note: I don't know if forceRefresh is desirable here, but I also don't know why things weren't rerendering on link clicks
      <Router forceRefresh>
        <div className="App-header">

          <Link to="/"><h3>Who's Playin'</h3></Link>
          <h2>Venues</h2>

          <ul style={{'listStyle': 'none', 'padding': '0'}}>
          {this.state.venues.map((venue, i) => (
            // to do: use id for key instead of index
            <li key={i}><Link to={`/venues/${venue.name}`}>{venue.name}</Link></li>
          ))}
          </ul>
        </div>
      </Router>
    );
  }
}

export default Venues;