import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from './android-chrome-512x512-copy.png';
import { onFilterChange, noSelection } from './utils';
import './App.css';

class Bands extends Component {

  // maybe break state up into more specific pieces?
  state = {
    // eventInfo: [],
  // ok I tried being more explicit here with what goes in state:
  // not exactly sure if it's useful, but I'm thinking I have it such that it is set in the same way,
  // but here you can see what belongs there and give each item empty defaults ??
    eventInfo: [
      {
        band_description: '',
        band_genre: '',
        band_name: '',
        event_date: '',
        event_datetime_object: null, // Fri Aug 09 2019 21:00:00 GMT-0400 (Eastern Daylight Time) {}
        event_datetime_string: '',
        event_time: '',
        venue_description: '',
        venue_name: ''
      }
    ],
    selectedGenres: [noSelection]
  }

  // (I wonder how componentDidMount actually compares to componentWillMount, etc.?)
  componentWillMount() {
    fetch(`/bands`)
      .then(response => response.json())
      .then(response => {
        // console.log(`response: \n`, response);
        // this.setState({
        //   bands: response.bands,
        //   venues: response.venues,
        //   events: response.events
        // }, () => {
        response.forEach(event => {
          // console.log('datetime: ', event.event_datetime);
          // console.log('datetime string: ', event.event_datetime_string);
          // event.datetime = new Date(event.event_datetime);
          // event.datetime = new Date(event.event_datetime_string);
          // event.event_datetime_object = new Date(event.event_datetime_string);
          // event.event_datetime_object = event.event_datetime_string ? new Date(event.event_datetime_string) : null;
          // if (event.event_datetime_string) {
          if (event.event_datetime_string !== 'none') {
            event.event_datetime_object = new Date(event.event_datetime_string);
            event.event_date = event.event_datetime_object.toDateString();
            event.event_time = event.event_datetime_object.toLocaleTimeString([], {timeStyle: 'short'});
          }
          // console.log('new datetime: ', event.datetime);
          // console.log('new datetime object: ', event.event_datetime_object);
          // console.log('typeof event.datetime: ', typeof(event.datetime));
          // maybe further convert datetime to desired formatting here, then just display during render, if this is even the right place?...
          // event.event_date = event.event_datetime_object.toDateString();
          // event.event_time = event.event_datetime_object.toLocaleTimeString([], {timeStyle: 'short'});
        });
        this.setState({
          eventInfo: response
        }, () => {
        // this.setState({
        //   // (never quite sure how to do this...)
        //   // ...response
        //   eventInfo: [...response]
        // }, () => {
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

          <label htmlFor="genre"><small>Genre:</small></label>
          <select 
            name="genre" 
            id="genre" 
            value={this.state.selectedGenres}             
            onChange={ event => {            
              let selectedGenres = onFilterChange(event.target.value, this.state.selectedGenres);              
              // (currently not sure whether it will ever matter if I have the return)
              return this.setState({selectedGenres});
              // FYI, actually this does seem to work too, but I'm thinking I like it less:
              // this.setState({genreValues: onFilterChange(event.target.value, this.state.genreValues)});
            }}     
            multiple
          >
          {/* Genre: rock, country, alternative, hip hop, DJ, orchestra ...idk, look up a list */}
            <option value={noSelection}>--none specified--</option>            
            <option value="country">country</option>
            <option value="rock">rock</option>
            <option value="pop">pop</option>
            <option value="variety">variety</option>
            <option value="alternative">alternative</option>
            <option value="hip-hop">hip-hop</option>
            <option value="dj">DJ</option>
            <option value="orchestra">orchestra</option>
            <option value="acoustic">acoustic</option>
            <option value="other">other</option>
            {/* <option></option> */}
          </select>
          <br/>

          {/* <label htmlFor="genre-list"><small>Genre:</small></label> */}
          {/* <input list="genre-list" /> */}
          {/* <input list="genre-list" multiple />           */}
          {/* <datalist name="genre-list" id="genre-list">           */}
            {/* <option value="">--Select a genre--</option>
            <option value="">none</option>
            <option value="">any/all</option> */}
            {/* <option value="country">country</option> */}
            {/* <option value="rock"></option> */}
          {/* </datalist> */}
          {/* <br/>  */}

          {/* (this one isn't even right yet..) */}
          {/* <label htmlFor="genre-check"><small>Genre:</small></label> */}
          {/* <input type="checkbox" name="genre-check" id="genre-check" /> */}
          {/* <input type="checkbox" multiple />           */}
            {/* <option value="">--Select a genre--</option>
            <option value="">none</option>
            <option value="">any/all</option> */}
            {/* <option value="country">country</option> */}
            {/* <option value="rock"></option> */}
          {/* <br/>  */}

          <table>
            <tbody>
              {this.state.eventInfo && this.state.eventInfo.map((event, i) => (              
                // to do: use id for key instead of index ?
                // link using id instead of name / how to link using name ?
                // also, I am actually not sure how much info should be on this page besides the list of bands? (well, obv..)
                (this.state.selectedGenres.includes(noSelection) || this.state.selectedGenres.includes(event.band_genre)) && (
                  <tr key={i}>
                    <td className="main"><big><Link to={`/bands/${event.band_name}`} className="main">{event.band_name}</Link></big> <br /> <span className="description">{event.band_description}</span></td>                
                    {/* <td className="main"><small>{event.band_description}</small></td> */}

                    {/* {event.event_date !== 'none' && */}
                    {/* may need to input some bands without events to check if I have this right (?) ... */}
                    {/* {event.event_datetime && */}
                    {/* {event.datetime && */}
                    {event.event_datetime_object &&
                      <Fragment>
                        <td><small><Link to={`/venues/${event.venue_name}`}>{event.venue_name}</Link></small> <br /> <span className="description">{event.venue_description}</span></td> 
                        {/* <td><small>{event.datetime.toDateString()}</small></td> */}
                        {/* <td><small>{event.event_datetime_object.toDateString()}</small></td> */}
                        <td><small>{event.event_date}</small></td>
                        {/* <td><small>{event.datetime.toLocaleTimeString([], {timeStyle: 'short'})}</small></td> */}
                        {/* <td><small>{event.event_datetime_object.toLocaleTimeString([], {timeStyle: 'short'})}</small></td>                         */}
                        <td><small>{event.event_time}</small></td>
                      </Fragment>       
                    }                                                        
                  </tr>
                ) 
              ))}
            </tbody>
          </table>

        </div>
      </Router>
    );
  }
}

export default Bands;


// a few examples/notes on <select> elements:

// (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select)

// <label for="pet-select">Choose a pet:</label>
// <select id="pet-select">
//     <option value="">--Please choose an option--</option>
//     <option value="dog">Dog</option>
//     <option value="cat">Cat</option>
//     <option value="hamster">Hamster</option>
//     <option value="parrot">Parrot</option>
//     <option value="spider">Spider</option>
//     <option value="goldfish">Goldfish</option>
// </select>

// <!-- The second value will be selected initially -->
// <select name="choice">
//   <option value="first">First Value</option>
//   <option value="second" selected>Second Value</option>
//   <option value="third">Third Value</option>
// </select>

// <label>Please choose one or more pets:
//   <select name="pets" multiple size="4">
//     <optgroup label="4-legged pets">
//       <option value="dog">Dog</option>
//       <option value="cat">Cat</option>
//       <option value="hamster" disabled>Hamster</option>
//     </optgroup>
//     <optgroup label="Flying pets">
//       <option value="parrot">Parrot</option>
//       <option value="macaw">Macaw</option>
//       <option value="albatross">Albatross</option>
//     </optgroup>
//   </select>
// </label>

// (https://www.w3schools.com/html/html_form_elements.asp and https://www.w3schools.com/tags/tag_select.asp might also be helpful..)
// https://www.w3schools.com/tags/tag_input.asp, https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input

// maybe try datalist, or input type=checkbox (w/ multiple), or input w/ list (and w/ multiple, and label plus placeholder..?) ?
// (actually I think it's that input w/ list goes with datalist..)

// ok idk checkboxes might be kindof annoying... (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox)

// (so far, didn't fully explore checkboxes and datalists, but I guess I got the multi select essentially working...)
// (also, I didn't much look into using a library/plugin or whatever, such as maybe https://www.syncfusion.com/javascript-ui-controls/js-multiselect-dropdown or https://www.jqueryscript.net/blog/Best-Multiple-Select-jQuery-Plugins.html)