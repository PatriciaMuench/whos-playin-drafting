import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from './android-chrome-512x512-copy.png';
import './App.css';

// (just copied in based on current state of Bands)

class Venues extends Component {

//   state = {venues: []}
  state = {
    bands: [],
    venues: [],
    events: [],
    eventInfo: []
  }

  componentWillMount() {
    fetch(`/venues`)
      .then(response => response.json())
    //   .then(response => this.setState({venues: response}))
    .then(response => this.setState({eventInfo: response}))
    .catch(error => console.log(error));
  }

  render() {

    return(
      // note: I don't know if forceRefresh is desirable here, but I also don't know why things weren't rerendering on link clicks
      <Router forceRefresh>
        <div className="App-header">

          {/* <Link to="/"><h3>Who's Playin'</h3></Link>
          <Link to="/bands"><h4>Bands</h4></Link> */}
          <span><img src={logo} alt="logo" className="logo" height="70" width="70" /><Link to="/"><big>Who's Playin'</big></Link> &nbsp; <Link to="/bands">Bands</Link></span>
          <h2 className="main">Venues</h2>

          {/* <ul style={{'listStyle': 'none', 'padding': '0'}}>
          {this.state.venues.map((venue, i) => (
            // to do: use id for key instead of index
        // * note sure exactly where this note belongs but, note: this is producing paths like '/The%20Chicken%20Box'...
            <li key={i}><Link to={`/venues/${venue.name}`}>{venue.name}</Link></li>
          ))}
          </ul> */}

          <table>
            <tbody>
              {/* {this.state.venues.map((venue, i) => (
                // to do: use id for key instead of index ?
                // link using id instead of name ?
                // * note sure exactly where this note belongs but, note: this is producing paths like '/The%20Chicken%20Box'...
                <tr key={i}>
                  <td><Link to={`/venues/${venue.name}`}>{venue.name}</Link></td>
                  <td>Band</td>
                </tr>
              ))} */}

              {this.state.eventInfo && this.state.eventInfo.map((event, i) => (              
                // (see notes in bands.js)
                <tr key={i}>
                  {/* <td><big><Link to={`/venues/${event.venue_name}`}>{event.venue_name}</Link></big></td>                
                  <td><small>{event.venue_description}</small></td> */}
                  <td className="main"><big><Link to={`/venues/${event.venue_name}`}>{event.venue_name}</Link></big><br /><small>{event.venue_description}</small></td>
                  {/* <td><small><Link to={`/bands/${event.band_name}`}>{event.band_name}</Link></small></td> 
                  <td><small>{event.event_date}</small></td>      
                  <td><small>{event.event_time}</small></td> */}
                  {event.event_date !== 'none' &&
                    <td><Link to={`/bands/${event.band_name}`}>{event.band_name}</Link> &nbsp; <small>{event.event_date}</small> &nbsp; <small>{event.event_time}</small></td>
                  }
                </tr>
              ))}

            </tbody>
          </table>

        </div>
      </Router>
    );
  }
}

export default Venues;