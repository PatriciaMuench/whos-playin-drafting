// (I'm not positive this is set up in the right place, etc. but hopefully fine)

// export const onFilterChange = event => {
// maybe I need to look up currying again, or maybe not??
// export const onFilterChange = event => { 
//   return filterArrayName => {  

// const innerFunc = event => { 
// // const innerFunc = (filterArrayName, value) => {     
//     // let value = this.value;
//     //   console.log('genreValues1: ', this.genreValues);
//     //   let value = event.target.value;
//     //   console.log('value: ', value);
//     //   let index = this.genreValues.findIndex(genreName => genreName === value);
//       let index = this.filterArrayName.findIndex(filterOption => filterOption === value);
//     //   console.log('index: ', index);
//     //   let noneSelectedIndex = this.genreValues.findIndex(genreName => genreName === 'no selection');
//       let noneSelectedIndex = this.filterArrayName.findIndex(filterOption => filterOption === 'no selection');
//     //   console.log('noneSelectedIndex: ', noneSelectedIndex);
//       if (this.value === 'no selection') {
//         // this.genreValues = ['no selection'];
//         this.filterArrayName = ['no selection'];    
//         // console.log('genreValues1.5: ', this.genreValues);
//       } else if (index === -1) {
//         if (noneSelectedIndex !== -1) {
//         //   this.genreValues.splice(noneSelectedIndex, 1);
//           this.filterArrayName.splice(noneSelectedIndex, 1);    
//         } 
//         //   this.genreValues.push(value);
//         this.filterArrayName.push(value);    
//         //   console.log('genreValues2: ', this.genreValues);                
//       } else {
//         // this.genreValues.splice(index, 1);
//         this.filterArrayName.splice(index, 1);    
//       //   console.log('genreValues3: ', this.genreValues);                  
//       }
//     //   this.setState({genreValues: this.genreValues});
//       this.setState({filterArrayName: this.filterArrayName});
//     }

// const filterArray = ['no selection'];

export async function onFilterChange (value, filterArrayName) {
// export async function onFilterChange (value, filterArrayName) { return async state => {
// export function onFilterChange (value, filterArray, filterArrayName) {
// export function onFilterChange (value, filterArray) {
  const filterArrayNameString = filterArrayName;  
  console.log('filterArrayName: ', filterArrayName);
  console.log('type of filterArrayName: ', typeof(filterArrayName));
  // let filterArray = this.state[filterArrayName];
  // const filterArray = this.state[filterArrayName];  
  // const filterArray = this.state[filterArrayNameString]; 
  // let filterArray = state[filterArrayNameString];     
  let filterArray = this.state[filterArrayNameString];       
// this.setState(prevState => {
//   let filterArray = prevState[filterArrayName];  
  console.log('filterArray1', filterArray);  
// export const onFilterChange = event => {     
//   let value = event.target.value;
//   let filterArrayName = filterArrayName;
//   return event => { 
// //   console.log('genreValues1: ', this.genreValues);
//   let value = event.target.value;
  console.log('value: ', value);
// //   let index = this.genreValues.findIndex(genreName => genreName === value);
//   let index = this.filterArrayName.findIndex(filterOption => filterOption === value);
  let index = filterArray.findIndex(filterOption => filterOption === value);
  console.log('index: ', index);
// //   let noneSelectedIndex = this.genreValues.findIndex(genreName => genreName === 'no selection');
//   let noneSelectedIndex = this.filterArrayName.findIndex(filterOption => filterOption === 'no selection');
  let noneSelectedIndex = filterArray.findIndex(filterOption => filterOption === 'no selection');
  console.log('noneSelectedIndex: ', noneSelectedIndex);
  if (value === 'no selection') {
    // this.genreValues = ['no selection'];
    // this.filterArrayName = ['no selection'];   
    filterArray = ['no selection'];         
    // filterArray = [value]; 
    noneSelectedIndex = filterArray.findIndex(filterOption => filterOption === 'no selection'); // ???
    console.log('noneSelectedIndex2: ', noneSelectedIndex);
    // console.log('genreValues1.5: ', this.genreValues);
    console.log('filterArray2', filterArray);
    // return this.setState({'filterArrayName': await filterArray}, console.log('stateShouldBeNoSelection: ', this.state[filterArrayName])); // filterArray, or maybe even straight to 'no selection' ???
    // return this.setState({filterArrayName: ['no selection']}, console.log('stateShouldBeNoSelection: ', this.state.filterArrayName)); // filterArray, or maybe even straight to 'no selection' ???
  } else if (index === -1) {
    if (noneSelectedIndex !== -1) {
    //   this.genreValues.splice(noneSelectedIndex, 1);
    //   this.filterArrayName.splice(noneSelectedIndex, 1);    
      filterArray.splice(noneSelectedIndex, 1);        
    } 
    //   this.genreValues.push(value);
    // this.filterArrayName.push(value); 
    filterArray.push(value);           
    //   console.log('genreValues2: ', this.genreValues);  
    console.log('filterArray3', filterArray);              
  } else {
    // this.genreValues.splice(index, 1);
    // this.filterArrayName.splice(index, 1);
    filterArray.splice(index, 1);            
  //   console.log('genreValues3: ', this.genreValues); 
    console.log('filterArray4', filterArray);                 
  }
//   this.setState({genreValues: this.genreValues});
//   this.setState({filterArrayName: this.filterArrayName});
  console.log('filterArray5: ', filterArray);
//   return this.setState({filterArrayName: filterArray}, console.log('filterArray6: ', filterArray, 'within state: ', this.state[filterArrayName]));
let currentFilterArray = filterArray;
console.log('currentFilterArray1: ', currentFilterArray);
console.log('type of filterArrayName2: ', typeof(filterArrayName));
// this may not be logging the updated state of the real component actually....
// BUT idk why it seems to work with everything but no selection!
// could it be that state is updated but target value is not???
// return this.setState({filterArrayName: currentFilterArray}, console.log('currentFilterArray2: ', currentFilterArray, 'within state: ', this.state[filterArrayName]));
// return this.setState({filterArrayName: currentFilterArray}, console.log('currentFilterArray2: ', currentFilterArray, 'within state: ', this.state.filterArrayName));
// this.setState({filterArrayName: currentFilterArray}, console.log('currentFilterArray2: ', currentFilterArray, 'within state: ', this.state.filterArrayName));
// this.setState({state[filterArrayNameString]: currentFilterArray}, console.log('currentFilterArray2: ', currentFilterArray, 'within state: ', this.state.filterArrayName));
return currentFilterArray;
// return {filterArrayNameString: currentFilterArray};
// this.setState({filterArrayName: filterArray}, console.log('filterArray6: ', filterArray, 'within state: ', this.state[filterArrayName]));
//   return {filterArrayName: filterArray}
// }, () => console.log('filterArray5: ', filterArray, 'within state: ', this.state[filterArrayName]));
// })
// }
//   innerFunc.call(this);
}
