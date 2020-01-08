import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from './android-chrome-512x512-copy.png';
import './App.css';

class Band extends Component {

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
        venue_description: '',
        venue_name: '',
        // default event_found to true to prevent 'no events found' from displaying while loading
        event_found: true
      }
    ]
  }

  bandName = this.props.match.params.name;

  componentWillMount = () => {
    fetch(`/bands/${this.bandName}`)
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
        <div className="App">
          <span><img src={logo} alt="logo" className="logo" height="70" width="70" /><Link to="/"><big>Who's Playin'</big></Link> &nbsp; <Link to="/bands">Bands</Link> &nbsp; <Link to="/venues">Venues</Link></span> 
          <h2 className="main" style={{'marginBottom': '5px'}}>{this.bandName}</h2>

          {this.state.eventInfo[0] &&
            <Fragment>
              <ul className="main">
                <li>{this.state.eventInfo[0].band_description}</li>
                <li>{this.state.eventInfo[0].band_website_url}</li>
              </ul>

              <table>
                <tbody>
                  {this.state.eventInfo.map((event, i) => (
                    event.event_found ? (
                      <tr key={i}>
                        <td>
                          <Link to={`/venues/${event.venue_name}`}>{event.venue_name}</Link> 
                          <br /> 
                          <span className="description">{event.venue_description}</span>
                        </td> 
                        <td>{event.event_date}</td>      
                        <td>{event.event_time}</td>
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

export default Band;
