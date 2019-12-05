/** 
 * Who's Playin' is a web application for finding live music events, built mainly with JavaScript 
 * (including a front end with React and a back end with Express and ReactRouter as well as SQLite).  
 * It is a personal project that has served as a valuable learning experience 
 * and demonstrates that I can build something new and functional on my own.
 * This app is a work in progress, and I have many potential plans for feature additions, improvements, and refactoring.
 * 
 * So far, functionality includes allowing a user to view live music events organized and filtered in various ways, 
 * and to add new bands, venues, or events into the database.
 * This file contains the Venues component, which displays a list of all the venues, along with an event scheduled at each venue 
 * if applicable, and some additional descriptive information. 
 * Users can filter the results by venue type (e.g. bar, concert hall) and/or size.
 * As this component loads, information is retrieved from the database, formatted in a useful way, and displayed with a bit of styling.
 * From this page, users can navigate to the landing page; to the calendar for a single venue, for all bands, or for a single band;
 * or to an entry form for adding a new venue or a new event.
 * 
 * (Thanks for taking a look, and please share any questions or feedback!)
 */

import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from './android-chrome-512x512-copy.png';
import { onFilterChange, noSelection, venueTypeOptions, venueSizeOptions } from './utils';
import './App.css';

class Venues extends Component {

  state = {
    eventInfo: [
      {
        band_description: '',
        band_name: '',
        event_date: '',
        event_datetime_object: null,
        event_datetime_string: '',
        event_time: '',
        venue_description: '',
        venue_name: '',
        venue_size: '',
        venue_type: '',
        // default event_found to true to prevent 'no events found' from displaying while venues load
        event_found: true
      }
    ],
    selectedVenueTypes: [noSelection],
    selectedSizes: [noSelection]
  }

  componentWillMount() {
    fetch(`/venues`)
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
      this.setState({eventInfo: response});
    })
    .catch(error => console.log(error));
  }

  render() {
    return(
      <Router forceRefresh>
        <div className="App-header">
          <span><img src={logo} alt="logo" className="logo" height="70" width="70" /><Link to="/"><big>Who's Playin'</big></Link> &nbsp; <Link to="/bands">Bands</Link></span>
          <h2 className="main">Venues</h2>

          <div>
            <label htmlFor="venue type"><small>Venue Type:&nbsp;</small></label>
            <select 
              name="venue type" 
              id="venue type" 
              value={this.state.selectedVenueTypes}
              onChange={event => {            
                let selectedVenueTypes = onFilterChange(event.target.value, this.state.selectedVenueTypes);
                return this.setState({selectedVenueTypes});
              }}
              multiple
            >          
              <option value={noSelection}>--none specified--</option>
              {venueTypeOptions.map(typeOption => (
                <option key={typeOption} value={typeOption}>{typeOption}</option>
              ))}
            </select>

            &nbsp;&nbsp;

            <label htmlFor="size"><small>Size:&nbsp;</small></label>
            <select 
              name="size" 
              id="size" 
              value={this.state.selectedSizes}
              onChange={event => {            
                let selectedSizes = onFilterChange(event.target.value, this.state.selectedSizes);
                return this.setState({selectedSizes});
              }}
              multiple
            >          
              <option value={noSelection}>--none specified--</option>
              {venueSizeOptions.map(sizeOption => (
                <option key={sizeOption} value={sizeOption}>{sizeOption}</option>
              ))}
            </select>
          </div>
          
          <br/>

          <table>
            <tbody>
              {this.state.eventInfo && this.state.eventInfo.map((event, i) => (
                ((this.state.selectedVenueTypes.includes(noSelection) || this.state.selectedVenueTypes.includes(event.venue_type))
                && (this.state.selectedSizes.includes(noSelection) || this.state.selectedSizes.includes(event.venue_size))) && (                             
                  <tr key={i}>
                    <td className="main">
                      <big><Link to={`/venues/${event.venue_name}`}>{event.venue_name}</Link></big> 
                      <br /> 
                      <span className="description">{event.venue_description}</span>
                    </td>
                    {event.event_found ? (
                      <Fragment>
                        <td>
                          <Link to={`/bands/${event.band_name}`}>{event.band_name}</Link> 
                          <br /> 
                          <span className="description">{event.band_description}</span>
                        </td>
                        <td><small>{event.event_date}</small> &nbsp; <small>{event.event_time}</small></td>
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

          <span><Link to="/new-venue">Add a Venue</Link> &nbsp; <Link to="/new-event">Add an Event</Link></span>
          <br />

        </div>
      </Router>
    );
  }
}

export default Venues;
