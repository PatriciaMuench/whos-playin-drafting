import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './home';
import Bands from './bands';
import Band from './band';
import Venues from './venues';
import Venue from './venue';
// import logo from './logo.svg';
// import logo from './favicon-copy.ico';
// import logo from './android-chrome-512x512-copy.png';
import './App.css';


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


// (based on https://reacttraining.com/react-router/web/guides/quick-start)
// function Index() {
//   return <h2>Home</h2>;
// }

// function About() {
//   return <h2>About</h2>;
// }

// function Users() {
//   return <h2>Users</h2>;
// }

// function AppRouter() {
//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/about/">About</Link>
//             </li>
//             <li>
//               <Link to="/users/">Users</Link>
//             </li>
//           </ul>
//         </nav>

//         <Route path="/" exact component={Index} />
//         <Route path="/about/" component={About} />
//         <Route path="/users/" component={Users} />
//       </div>
//     </Router>
//   );
// }

// export default AppRouter;


class App extends Component {
// (based on https://www.twilio.com/blog/react-app-with-node-js-server-proxy)
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     name: '',
  //     greeting: ''
  //   };
  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }

  // handleChange(event) {
  //   this.setState({ name: event.target.value });
  // }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   fetch(`/api/greeting?name=${encodeURIComponent(this.state.name)}`)
  //     .then(response => response.json())
  //     .then(state => this.setState(state));
  // }


  render() {
    return (
      <Router>

      {/* <img src={logo} alt="logo" className="logo" height="100" width="100" /> */}

      {/* note: consider if having everything centered is really what I want... */}
        <div className="App">
        
          {/* <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="name">Enter your name: </label>
              <input
                id="name"
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <button type="submit">Submit</button>
            </form>
            <p>{this.state.greeting}</p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header> */}


          <Route exact path="/" component={Home} />
          <Route exact path="/bands" component={Bands}/>
          <Route path="/bands/:name" component={Band} />
          <Route exact path="/venues" component={Venues}/>
          <Route path="/venues/:name" component={Venue} />

        </div>
      </Router>
    );
  }
}

export default App;
