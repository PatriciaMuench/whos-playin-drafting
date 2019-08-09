import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
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
          <Link to="/venues"><h4>Venues</h4></Link>
          <h2>Bands</h2>

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

          <table>
            <tbody>
              {this.state.bands.map((band, i) => (
              // to do: use id for key instead of index ?
              // link using id instead of name ?
              <tr key={i}>
                <td><Link to={`/bands/${band.name}`}>{band.name}</Link></td>
                <td>Venue</td>
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