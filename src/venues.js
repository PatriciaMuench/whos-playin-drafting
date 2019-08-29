import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from './android-chrome-512x512-copy.png';
import { onFilterChange } from './utils';
import './App.css';

// (many of notes in bands.js apply to this file as well...)

class Venues extends Component {

  state = {
    eventInfo: [],
    selectedVenueTypes: ['no selection']
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

          {/* Potential first few filters for venues:
          Venue type (?)
          Size
          Maybe cuisine?
          Maybe something like serves food, serves alcohol, BYOB, (BYOF?) ? */}
          {/* Restaurant / bar / concert hall / pavillion / park ? performance venue/music venue? [e.g. house of blues?] */}

          {/* (not really sure on names for category and options) */}
          <label htmlFor="venue type"><small>Venue Type:</small></label>
          <select 
            name="venue type" 
            id="venue type" 
            value={this.state.selectedVenueTypes}
            onChange={ event => {            
              let selectedVenueTypes = onFilterChange(event.target.value, this.state.selectedVenueTypes);
              // this.setState({genreValues: selectedGenreValues});
              // (currently not sure whether it will ever matter if I have the return)
              // return this.setState({selectedVenueTypes: selectedVenueTypes});
              return this.setState({selectedVenueTypes});
              // FYI, actually this does seem to work too, but I'm thinking I like it less:
              // this.setState({genreValues: onFilterChange(event.target.value, this.state.genreValues)});
            }}     
            multiple
          >          
            <option value="no selection">--none specified--</option>
            <option value="restaurant">restaurant</option>
            <option value="bar">bar</option>            
            <option value="live music venue">live music venue</option>
            <option value="concert hall">concert hall</option>
            <option value="pavillion">pavillion</option>
            <option value="park">park</option>
            <option></option>            
          </select>
          <br/>

          <table>
            <tbody>
              {this.state.eventInfo && this.state.eventInfo.map((event, i) => ( 
                (this.state.selectedVenueTypes.includes('no selection') || this.state.selectedVenueTypes.includes(event.venue_type)) && (                             
                <tr key={i}>
                  <td className="main"><big><Link to={`/venues/${event.venue_name}`}>{event.venue_name}</Link></big> <br /> <span className="description">{event.venue_description}</span></td>
                  {event.event_date !== 'none' &&
                    <Fragment>
                      <td><Link to={`/bands/${event.band_name}`}>{event.band_name}</Link> <br /> <span className="description">{event.band_description}</span></td>
                      <td><small>{event.event_date}</small> &nbsp; <small>{event.event_time}</small></td>
                    </Fragment>
                  }
                </tr>
                )
              ))}
            </tbody>
          </table>

        </div>
      </Router>
    );
  }
}

export default Venues;