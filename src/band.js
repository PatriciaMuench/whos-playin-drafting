import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from './android-chrome-512x512-copy.png';
import './App.css';

// const fetchBandInfo = (bandName) => {
//     fetch(`/bands/${bandName}`)    
//     // fetch(`/bands/:name`)    
//       .then(response => response.json())
//       .then(response => console.log(response))
//     // .then(response => this.setState({band: response}))
//     .catch(error => console.log(error));
// // }
// };

class Band extends Component {
// const Band = ({match}) => {



    // ok at the moment I'm not even sure if I should be hitting the server for individual band info 
    // or if I should just be passing it from the data loaded for the Bands page... 
    // probably because I'm not even using all the right data...
    // I guess I'll just try something...

    // should the band or bandName be the prop??
    // static propTypes = {bandName: PropTypes.string.isRequired}

    // (will need more/different details...)
    // state = {band: null}
    // state = {eventInfo: []}
    state = {
      eventInfo: [
        {
          band_description: '',
          band_name: '',
          band_website_url: '',
          event_date: '',
          event_datetime_object: null, // Fri Aug 09 2019 21:00:00 GMT-0400 (Eastern Daylight Time) {}
          event_datetime_string: '',
          event_time: '',
          venue_description: '',
          venue_name: '',
          event_found: true // (?)
        }
      ]
    }

    // bandName = request.params.name; // ??
    // const bandName = match.params.name;
    bandName = this.props.match.params.name;

    componentWillMount = () => {
      // how to write path/param?
    //   fetch(`/bands/:name`)
    // const band = fetch(`/bands/${match.params.name}`)    
    // const band = fetch(`/bands/${bandName}`)    
    // const fetchBandInfo = () => {
    //     fetch(`/bands/${bandName}`)    
    //     .then(response => {
    //         console.log(response);
    //         response = response.json();
    //         console.log(response);
    //         return response;
    //     })
    //     // .then(response => this.setState({band: response}))
    //     .catch(error => console.log(error));
    // // }
    // };
    // const band = fetchBandInfo();
    // const band = fetchBandInfo(bandName);

    // bandInfo = fetch(`/bands/${this.bandName}`)
    // const fetchBandInfo = (bandName) => {
      // console.log(this.bandName);
      fetch(`/bands/${this.bandName}`)
      .then(response => response.json())    
      .then(response => {
        console.log('response: ', response);
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
      // .then(() => {
      //   console.log(this.state);
      //   console.log(this.state.eventInfo);
      //   console.log(this.state.eventInfo[0]);
      // })   
      .catch(error => console.log(error.message)) // (?)    
      
    //   return this.response;
    }
    // const bandInfo = fetchBandInfo(bandName);
    // console.log(bandInfo);
    // console.log(fetchBandInfo(bandName));
    // bandURL = this.bandInfo['website_url'];
    // console.log(bandURL);


    render() {
    // console.log(this.bandURL);
      // console.log(this.state);
      // console.log(this.state.eventInfo);
      // console.log(this.state.eventInfo[0]);

    return(

        // const bands = fetch('/bands')
        //   .then(response => response.json());
        // console.log(bands);
    
        // console.log(this.state.bands);
    
        // console.log(this.state);

        // const bandName = this.props.bandName; // ??
        // const bandName = request.params.name; // ??
        
        // const band = this.state.band; // (?)

        // return(
          // note: I don't know if forceRefresh is desirable here, but I also don't know why things weren't rerendering on link clicks
          <Router forceRefresh>
            <div className="App-header">
    
              {/* I think I'd actually want a better stylized menu bar or breadcrukbs or something... */}
              {/* <Link to="/"><h3>Who's Playin'</h3></Link>
              <Link to="/bands"><h3>Bands</h3></Link> */}
              <span><img src={logo} alt="logo" className="logo" height="70" width="70" /><Link to="/"><big>Who's Playin'</big></Link> &nbsp; <Link to="/bands">Bands</Link> &nbsp; <Link to="/venues">Venues</Link></span> 

              {/* <h2>{band.name}</h2> */}
              <h2 className="main" style={{'marginBottom': '5px'}}>{this.bandName}</h2>
    
              {/* {this.state.band && */}
              {this.state.eventInfo[0] &&              
              // (this prob doesn't even need to be a list, but I guess we can decide later...)
              // <ul style={{'listStyle': 'none', 'padding': '0'}} className="main">
                <Fragment>
                  <ul className="main">
                      {/* (strings as keys?) */}
                    {/* <li key="description">{this.state.band.description}</li>
                    <li key="site">{this.state.band.website_url}</li> */}
                    <li key="description">{this.state.eventInfo[0].band_description}</li>
                    <li key="site">{this.state.eventInfo[0].band_website_url}</li>
                  </ul>
                  <table>
                    <tbody>
                      {this.state.eventInfo.map((event, i) => (
                        // (?)
                        event.event_found ? (
                          <tr key={i}>
                            {/* (update keys...) */}
                            <td key={`venue${i}`}><Link to={`/venues/${event.venue_name}`}>{event.venue_name}</Link> <br /> <span className="description">{event.venue_description}</span></td> 
                            <td key={`date${i}`}>{event.event_date}</td>      
                            <td key={`time${i}`}>{event.event_time}</td>
                          </tr>    
                        ) : (
                          // maybe edit styling for this 
                          // (also not positive if this is all done right, but fine for now I guess...)
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