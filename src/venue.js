import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from './android-chrome-512x512-copy.png';
import './App.css';

class Venue extends Component {

    // state = {venue: null}
    // state = {eventInfo: []}
    state = {
      eventInfo: [
        {
          band_description: '',
          band_name: '',
          band_website_url: '',
          event_date: '',
          event_datetime_object: null, // ex: Fri Aug 09 2019 21:00:00 GMT-0400 (Eastern Daylight Time) {}
          event_datetime_string: '',
          event_time: '',
          venue_city: '',
          venue_description: '',
          venue_name: '',
          venue_state: '',
          venue_website_url: '',
          event_found: true // (?)
        }
      ]
    }
  
    venueName = this.props.match.params.name;

    componentWillMount = () => {
      fetch(`/venues/${this.venueName}`)
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
        console.log('state: ', this.state);
      })  
      .catch(error => console.log(error.message)) // (?)    
    }

    render() {
    //   console.log(this.state);

    return(
          <Router forceRefresh>
            <div className="App-header">
    
              {/* I think I'd actually want a better stylized menu bar or breadcrumbs or something... */}
              {/* <Link to="/"><h3>Who's Playin'</h3></Link>
              <Link to="/venues"><h3>Venues</h3></Link> */}
              <span><img src={logo} alt="logo" className="logo" height="70" width="70" /><Link to="/"><big>Who's Playin'</big></Link> &nbsp; <Link to="/venues">Venues</Link> &nbsp; <Link to="/bands">Bands</Link></span> 

              {/* add, in several places... */}

              <h2 className="main" style={{'marginBottom': '5px'}}>{this.venueName}</h2>
    
              {this.state.eventInfo[0] &&            
                <Fragment>  
                  {/* // (this prob doesn't even need to be a list, but I guess we can decide later...) */}
                  <ul className="main">
                      {/* (strings as keys?) */}
                    {/* <li  key="location">{`${this.state.venue.city}, ${this.state.venue.state}`}</li>                  
                    <li  key="description">{this.state.venue.description}</li>
                    <li  key="site">{this.state.venue.website_url}</li> */}
                    <li  key="description">{this.state.eventInfo[0].venue_description}</li>
                    {/* <li  key="location">{`${this.state.eventInfo[0].city}, ${this.state.eventInfo[0].state}`}</li>                   */}
                    <li  key="location">{`${this.state.eventInfo[0].venue_city}, ${this.state.eventInfo[0].venue_state}`}</li>                  
                    <li  key="site">{this.state.eventInfo[0].venue_website_url}</li>
                  </ul>

                  <table>
                    <tbody>
                      {this.state.eventInfo.map((event, i) => (
                        event.event_found ? (
                          <tr key={i}>
                            {/* (update keys...) */}
                            <td key={`band${i}`}><Link to={`/bands/${event.band_name}`}>{event.band_name}</Link> <br /> <span className="description">{event.band_description}</span></td> 
                            <td key={`date${i}`}>{event.event_date} <br /> &nbsp; </td>     
                            <td key={`time${i}`}>{event.event_time} <br /> &nbsp; </td>
                          </tr>    
                        ) : (
                          // (?)
                          <tr key={i}><td><small><em>no events found</em></small></td></tr>
                        )
                      ))}
                    </tbody>
                  </table>
                </Fragment>
              }
            </div>
          </Router>
        );
      }
    }
    
    export default Venue;