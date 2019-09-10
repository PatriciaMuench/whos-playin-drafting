import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from './android-chrome-512x512-copy.png';
import { onFilterChange, noSelection } from './utils';
import './App.css';

// (many of notes in bands.js apply to this file as well...)

class Venues extends Component {

  state = {
    // eventInfo: [],
    eventInfo: [
      {
        band_description: '',
        band_name: '',
        event_date: '',
        event_datetime_object: null, // ex: Fri Aug 09 2019 21:00:00 GMT-0400 (Eastern Daylight Time) {}
        event_datetime_string: '',
        event_time: '',
        venue_description: '',
        venue_name: '',
        venue_size: '',
        venue_type: '',
        event_found: true // (?)
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
          // console.log('datetime string: ', event.event_datetime_string);
          event.event_datetime_object = new Date(event.event_datetime_string);
          // console.log('new datetime object: ', event.event_datetime_object);
          // console.log('typeof event.datetime: ', typeof(event.datetime));
          event.event_date = event.event_datetime_object.toDateString();
          event.event_time = event.event_datetime_object.toLocaleTimeString([], {timeStyle: 'short'});
          event.event_found = true;
        } else {
          event.event_found = false;
        }
      });
      this.setState({eventInfo: response});
      console.log('state: ', this.state);
    })
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

          {/* obv needing some layout stuff here.... */}
          {/* <span> */}
          <div>
            {/* (not really sure on names for category and options) */}
            <label htmlFor="venue type"><small>Venue Type:&nbsp;</small></label>
            <select 
              name="venue type" 
              id="venue type" 
              value={this.state.selectedVenueTypes}
              onChange={event => {            
                let selectedVenueTypes = onFilterChange(event.target.value, this.state.selectedVenueTypes);
                return this.setState({selectedVenueTypes});
              }}
              // FYI, this seems to work too:
              // onChange={event => this.setState({selectedVenueTypes: onFilterChange(event.target.value, this.state.selectedVenueTypes)})}     
              multiple
            >          
              <option value={noSelection}>--none specified--</option>
              <option value="restaurant">restaurant</option>
              <option value="bar">bar</option>            
              <option value="live music venue">live music venue</option>
              <option value="concert hall">concert hall</option>
              <option value="pavillion">pavillion</option>
              <option value="park">park</option>
              {/* <option></option> */}
            </select>

            &nbsp;&nbsp;

            {/* (also not really sure on options here, of course..) */}
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
              <option value="small">small</option>
              <option value="medium">medium</option>            
              <option value="large">large</option>
              {/* <option></option> */}
            </select>
          </div>
          {/* </span> */}
          
          <br/>

          <table>
            <tbody>
              {this.state.eventInfo && this.state.eventInfo.map((event, i) => (
                ((this.state.selectedVenueTypes.includes(noSelection) || this.state.selectedVenueTypes.includes(event.venue_type))
                && (this.state.selectedSizes.includes(noSelection) || this.state.selectedSizes.includes(event.venue_size))) && (                             
                  <tr key={i}>
                    <td className="main"><big><Link to={`/venues/${event.venue_name}`}>{event.venue_name}</Link></big> <br /> <span className="description">{event.venue_description}</span></td>
                    {event.event_found ? (
                      <Fragment>
                        <td><Link to={`/bands/${event.band_name}`}>{event.band_name}</Link> <br /> <span className="description">{event.band_description}</span></td>
                        <td><small>{event.event_date}</small> &nbsp; <small>{event.event_time}</small></td>
                      </Fragment>
                    ) : (
                      // (edit styling?...)
                      <td><small><em>no events found</em></small></td>
                    )
                    }
                  </tr>
                )
              ))}
            </tbody>
          </table>

          {/* maybe add links (or buttons?) to create/add a venue, and possibly create/add an event (?) */}
          <Link to="/new-venue">Add a Venue</Link>

        </div>
      </Router>
    );
  }
}

export default Venues;