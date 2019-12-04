import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from './android-chrome-512x512-copy.png';
import { onFilterChange, noSelection, genreOptions } from './utils';
import './App.css';

class Bands extends Component {

  state = {
    eventInfo: [
      {
        band_description: '',
        band_genre: '',
        band_name: '',
        event_date: '',
        // example event_datetime_object: Fri Aug 09 2019 21:00:00 GMT-0400 (Eastern Daylight Time) {}
        event_datetime_object: null,
        event_datetime_string: '',
        event_time: '',
        venue_description: '',
        venue_name: '',
        // default event_found to true to prevent 'no events found' from displaying while bands load
        event_found: true
      }
    ],
    selectedGenres: [noSelection]
  }

  componentWillMount() {
    fetch(`/bands`)
      .then(response => response.json())
      .then(response => {
        response.forEach(event => {
          if (event.event_datetime_string !== 'none') {
            event.event_datetime_object = new Date(event.event_datetime_string);
            event.event_date = event.event_datetime_object.toDateString();
            event.event_time = event.event_datetime_object.toLocaleTimeString([], {timeStyle: 'short'});
            event.event_found = true;
          } else {
            event.event_found = false;
          }
        });
        // this.setState({eventInfo: response});
        this.setState({
          eventInfo: response
        }, () => {
          console.log('state, within componentWillMount: \n', this.state);
        })
      })
      .catch(error => console.log(error));
  }

  render() {
    return(
      <Router forceRefresh>
        <div className="App-header">
          <span><img src={logo} alt="logo" className="logo" height="70" width="70" /><Link to="/"><big>Who's Playin'</big></Link> &nbsp; <Link to="/venues">Venues</Link></span> 
          <h2 className="main">Bands</h2>

          <label htmlFor="genre"><small>Genre:</small></label>
          <select 
            name="genre" 
            id="genre" 
            value={this.state.selectedGenres}             
            onChange={ event => {            
              let selectedGenres = onFilterChange(event.target.value, this.state.selectedGenres);              
              return this.setState({selectedGenres});
            }}     
            multiple
          >
            <option value={noSelection}>--none specified--</option>
            {genreOptions.map(genreOption => (
              <option key={genreOption} value={genreOption}>{genreOption}</option>
            ))}
          </select>
          <br/>

          <table>
            <tbody>
              {this.state.eventInfo && this.state.eventInfo.map((event, i) => (
                (this.state.selectedGenres.includes(noSelection) || this.state.selectedGenres.includes(event.band_genre)) && (
                  <tr key={i}>
                    <td className="main">
                      <big><Link to={`/bands/${event.band_name}`}>{event.band_name}</Link></big> 
                      <br /> 
                      <span className="description">{event.band_description}</span>
                    </td>                
                    {event.event_found ? (
                      <Fragment>
                        <td>
                          <small><Link to={`/venues/${event.venue_name}`}>{event.venue_name}</Link></small> 
                          <br /> 
                          <span className="description">{event.venue_description}</span>
                        </td> 
                        <td><small>{event.event_date}</small></td>
                        <td><small>{event.event_time}</small></td>
                      </Fragment>
                    ) : (
                      <td><small><em>no events found</em></small></td>
                    )}                                                        
                  </tr>
                ) 
              ))}
            </tbody>
          </table>
          <br />

          <span><Link to="/new-band">Add a Band</Link> &nbsp; <Link to="/new-event">Add an Event</Link></span>
          <br />

        </div>
      </Router>
    );
  }
}

export default Bands;
