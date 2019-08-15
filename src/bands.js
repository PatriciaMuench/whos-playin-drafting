import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from './android-chrome-512x512-copy.png';
import './App.css';

class Bands extends Component {

  // maybe break state up into more specific pieces?
  state = {
    eventInfo: []
  }

  // (I wonder how componentDidMount actually compares to componentWillMount, etc.?)
  componentWillMount() {
    fetch(`/bands`)
      .then(response => response.json())
      .then(response => {
        console.log(`response: \n`, response);
        // this.setState({
        //   // bands: response[0],
        //   // venues: response[1],
        //   // events: response[2]
        //   bands: response.bands,
        //   venues: response.venues,
        //   events: response.events
        // }, () => {
        this.setState({
          eventInfo: response
        }, () => {
        console.log('state, within componentWillMount: \n', this.state);
      })})
      .catch(error => console.log(error));
  }

  render() {
    return(
      // note: I don't know if forceRefresh is desirable here, but I also don't know why things weren't rerendering on link clicks
      <Router forceRefresh>
        <div className="App-header">
          <span><img src={logo} alt="logo" className="logo" height="70" width="70" /><Link to="/"><big>Who's Playin'</big></Link> &nbsp; <Link to="/venues">Venues</Link></span> 
          <h2 className="main">Bands</h2>

          <table>
            <tbody>
              {this.state.eventInfo && this.state.eventInfo.map((event, i) => (              
                // to do: use id for key instead of index ?
                // link using id instead of name / how to link using name ?
                // also, I am actually not sure how much info should be on this page besides the list of bands? (well, obv..)
                <tr key={i}>
                  <td className="main"><big><Link to={`/bands/${event.band_name}`} className="main">{event.band_name}</Link></big> <br /> <span className="description">{event.band_description}</span></td>                
                  {/* <td className="main"><small>{event.band_description}</small></td> */}
                  {event.event_date !== 'none' &&
                    <Fragment>
                      <td><small><Link to={`/venues/${event.venue_name}`}>{event.venue_name}</Link></small> <br /> <span className="description">{event.venue_description}</span></td> 
                      <td><small>{event.event_date}</small></td>      
                      <td><small>{event.event_time}</small></td>       
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

export default Bands;