import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from './android-chrome-512x512-copy.png';
import './App.css';

class Venue extends Component {

  state = {
    eventInfo: [
      {
        band_description: '',
        band_name: '',
        band_website_url: '',
        event_date: '',
        event_datetime_object: null,
        event_datetime_string: '',
        event_time: '',
        venue_city: '',
        venue_description: '',
        venue_name: '',
        venue_state: '',
        venue_website_url: '',
        // default event_found to true to prevent 'no events found' from displaying while loading
        event_found: true
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
    })  
    .catch(error => console.log(error.message));    
  }

  render() {
    return(
      <Router forceRefresh>
        <div className="App-header">
          <span><img src={logo} alt="logo" className="logo" height="70" width="70" /><Link to="/"><big>Who's Playin'</big></Link> &nbsp; <Link to="/venues">Venues</Link> &nbsp; <Link to="/bands">Bands</Link></span>
          <h2 className="main" style={{'marginBottom': '5px'}}>{this.venueName}</h2>

          {this.state.eventInfo[0] &&            
            <Fragment>  
              <ul className="main">
                <li>{this.state.eventInfo[0].venue_description}</li>
                <li>{`${this.state.eventInfo[0].venue_city}, ${this.state.eventInfo[0].venue_state}`}</li>                  
                <li>{this.state.eventInfo[0].venue_website_url}</li>
              </ul>

              <table>
                <tbody>
                  {this.state.eventInfo.map((event, i) => (
                    event.event_found ? (
                      <tr key={i}>
                        <td>
                          <Link to={`/bands/${event.band_name}`}>{event.band_name}</Link> 
                          <br /> 
                          <span className="description">{event.band_description}</span>
                        </td> 
                        <td>{event.event_date} <br /> &nbsp; </td>     
                        <td>{event.event_time} <br /> &nbsp; </td>
                      </tr>    
                    ) : (
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
