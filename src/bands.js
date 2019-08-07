import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
// import Home from './home';
import './App.css';

class Bands extends Component {

  state = {bands: []}

  componentWillMount() {
    fetch(`/bands`)
      .then(response => response.json())
      .then(response => this.setState({bands: response}))
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

          <Link to="/"><h3>Who's Playin'</h3></Link>
          <h2>Bands</h2>

          {/* {this.bands.map(band => ( */}
          {/* {this.bandsList.forEach(band => band.map(band => ( */}
          <ul>
          {this.state.bands.map((band, i) => (
            // to do: use id for key instead of index
            <li key={i}>{band.name}</li>
          ))}
          </ul>
        </div>
      </Router>
    );
  }
}

export default Bands;