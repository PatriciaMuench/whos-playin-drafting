import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from './android-chrome-512x512-copy.png';
import './App.css';

// (just copied in based on current state of Band)

class Venue extends Component {

    // state = {venue: null}
    state = {eventInfo: []}
  
    venueName = this.props.match.params.name;

    componentWillMount = () => {
    //   console.log(this.venueName);
      fetch(`/venues/${this.venueName}`)
      .then(response => response.json())
      // .then(response => this.setState({venue: response}))
      .then(response => this.setState({eventInfo: response}))
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
    
              {/* {this.state.venue && */}
              {this.state.eventInfo[0] &&            
                <Fragment>  
                  {/* // (this prob doesn't even need to be a list, but I guess we can decide later...) */}
                  <ul className="main">
                      {/* (strings as keys?) */}
                    {/* <li  key="location">{`${this.state.venue.city}, ${this.state.venue.state}`}</li>                  
                    <li  key="description">{this.state.venue.description}</li>
                    <li  key="site">{this.state.venue.website_url}</li> */}
                    <li  key="description">{this.state.eventInfo[0].venue_description}</li>
                    <li  key="location">{`${this.state.eventInfo[0].city}, ${this.state.eventInfo[0].state}`}</li>                  
                    <li  key="site">{this.state.eventInfo[0].venue_website_url}</li>
                  </ul>

                  <table>
                    <tbody>
                      {this.state.eventInfo.map((event, i) => (
                        event.event_date !== 'none' && (
                          <tr key={i}>
                            {/* (update keys...) */}
                            <td key={`band${i}`}><Link to={`/bands/${event.band_name}`}>{event.band_name}</Link> <br /> <span className="description">{event.band_description}</span></td> 
                            <td key={`date${i}`}>{event.event_date} <br /> &nbsp; </td>     
                            <td key={`time${i}`}>{event.event_time} <br /> &nbsp; </td>       
                          </tr>    
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