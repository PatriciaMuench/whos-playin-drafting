import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from './android-chrome-512x512-copy.png';
import './App.css';

// (many of notes in bands.js apply to this file as well...)

class Venues extends Component {

  state = {
    eventInfo: []
  }

  componentWillMount() {
    fetch(`/venues`)
    .then(response => response.json())
    .then(response => this.setState({eventInfo: response}))
    .catch(error => console.log(error));
  }

  render() {
    return(
      <Router forceRefresh>
        <div className="App-header">
          <span><img src={logo} alt="logo" className="logo" height="70" width="70" /><Link to="/"><big>Who's Playin'</big></Link> &nbsp; <Link to="/bands">Bands</Link></span>
          <h2 className="main">Venues</h2>

        {/* // * not sure exactly where this note belongs but, note: this is producing paths like '/The%20Chicken%20Box'... */}

          <table>
            <tbody>
              {this.state.eventInfo && this.state.eventInfo.map((event, i) => (              
                <tr key={i}>
                  <td className="main"><big><Link to={`/venues/${event.venue_name}`}>{event.venue_name}</Link></big> <br /> <span className="description">{event.venue_description}</span></td>
                  {event.event_date !== 'none' &&
                    <Fragment>
                      <td><Link to={`/bands/${event.band_name}`}>{event.band_name}</Link> <br /> <span className="description">{event.band_description}</span></td>
                      <td><small>{event.event_date}</small> &nbsp; <small>{event.event_time}</small></td>
                    </Fragment>
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