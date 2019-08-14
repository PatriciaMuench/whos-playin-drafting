import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
// import Home from './home';
import logo from './android-chrome-512x512-copy.png';
import './App.css';

class Bands extends Component {

  // state = {bands: []}
  state = {
    bands: [],
    venues: [],
    events: [],
    eventInfo: []
  }

  componentWillMount() {
    fetch(`/bands`)
      .then(response => response.json())
      // .then(response => this.setState({bands: response}, () => {
      .then(response => {
        // if (response !== undefined) {
        console.log(response);
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
        console.log('within componentWillMount');
        console.log(this.state);
      })})
      // .then(() => {
      //   console.log('also within componentWillMount');
      //   console.log(this.state);
      // })
      .catch(error => console.log(error));
  }

//   componentDidMount() {
//     fetch(`/bands`)
//       .then(response => response.json())
//     //   .then(state => this.setState(state));
//     .then(response => this.setState({bands: response}));
//   }

//   bands = [
//     {
//         name: 'BearFight',
//         website_url: 'bearfight.com',
//         description: 'rock cover/wedding band'
//     },
//     {
//         name: 'Dalton',
//         website_url: 'daltonsherrifs.com',
//         description: 'country cover & original solo artist'
//     }
//   ];

//   bandsList = async () => {
//       return await fetch('/bands').then(response => {
//           console.log(response.body);
//           return response.json()
//         });
//   }
    // bandsList = fetch('/bands').then(response => {
    //     console.log(JSON.stringify(response));
    //     return response.json();
    // });
    // bandsList = async () => {
    //   return await fetch('/bands');
    // };
    // bandsList = fetch('/bands'); // .then(response => response.body);

  render() {

    // const bands = fetch('/bands')
    //   .then(response => response.json());
    // console.log(bands);

    // console.log(this.state.bands);

    return(
      // note: I don't know if forceRefresh is desirable here, but I also don't know why things weren't rerendering on link clicks
      <Router forceRefresh>
        <div className="App-header">

          {/* <Link to="/">Home</Link> */}
          {/* <Route path="/" exact component={Home} /> */}

          {/* <span><Link to="/"><h3>Who's Playin'</h3></Link>
          <Link to="/venues"><h4>Venues</h4></Link></span> */}
          <span><img src={logo} alt="logo" className="logo" height="70" width="70" /><Link to="/"><big>Who's Playin'</big></Link> &nbsp; <Link to="/venues">Venues</Link></span> 
          <h2 className="main">Bands</h2>

          {/* {this.bands.map(band => ( */}
          {/* {this.bandsList.forEach(band => band.map(band => ( */}
          {/* <ul style={{'listStyle': 'none', 'padding': '0'}}>
          {this.state.bands.map((band, i) => (
            // to do: use id for key instead of index
            // how to link using name??...
            <li key={i}><Link to={`/bands/${band.name}`}>{band.name}</Link></li>
            // <li key={i}><Link to={`/bands/:name`}>{band.name}</Link></li>            
          ))}
          </ul> */}

          {/* attempting to handle errors while trying to implement sqlite... */}
          {/* {this.state.bands &&  */}
          <table>
          {/* <table className="App-body"> */}
            <tbody>
              {/* {this.state.bands && this.state.bands.map((band, i) => ( */}
              {this.state.eventInfo && this.state.eventInfo.map((event, i) => (              
              // to do: use id for key instead of index ?
              // link using id instead of name ?
              // also, I am actually not sure how much info should be on this page besides the list of bands? (well, obv..)
              /* <Fragment> */
              <tr key={i}>
                {/* <td><Link to={`/bands/${band.name}`}>{band.name}</Link></td> */}
                <td className="main"><big><Link to={`/bands/${event.band_name}`} className="main">{event.band_name}</Link></big></td>                
                <td className="main"><small>{event.band_description}</small></td>
                <td><small><Link to={`/venues/${event.venue_name}`}>{event.venue_name}</Link></small></td> 
                <td><small>{event.date}</small></td>      
                <td><small>{event.time}</small></td>                                                                      
              </tr>
              /* <tr key={`${i}a`}>
                <td><small>{event.band_description}</small></td>
              </tr> */
              /* </Fragment> */
              ))}
            </tbody>
          </table>
          {/* } */}

        </div>
      </Router>
    );
  }
}

export default Bands;