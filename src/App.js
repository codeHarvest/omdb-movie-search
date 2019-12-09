import React from 'react';
import './style.scss';
// import Movies from './Movies.component';
import broken from './assets/placeholder_broken.png';


const apiKey= '';
const baseURI = `http://www.omdbapi.com/?apikey=${apiKey}`;

class App extends React.Component{
 
    constructor(){
      super();
      this.state = {
          movies : [],
          searchQuery: '',
          options: ['Title','id'],
          selectedOptionValue: null,
          types: ['Movie','Series','Episode'],
          year: '',
          page: 1
        }
    }
    

  handleChange = e => {
    this.setState({searchQuery: e.target.value });
  }
  
  handleYear = e => {
    this.setState({ year: e.target.value });
  }
  
  handleOption = (e) => {
    this.setState({ selectedOptionValue: e.target.value }) 
  }

  handleType = (e) => {
    this.setState({ type : e.target.value })
  }

  handleRequest= async (searchQuery = '') =>{
    await fetch(`${baseURI}&${
      this.state.selectedOptionValue === 'Title' ? 't' : 
      this.state.selectedOptionValue === 'id' ? 'i' : 's' }=${this.state.searchQuery}`+searchQuery)
    .then(data =>  data.json())
    .then(data =>  this.setState({ movies : data}))
    .catch(err => console.log(err));
  }
  
  loadMore = () => {
    this.setState(
      prevState => ({
        page : prevState.page + 1,
        scrolling: true
      }),
      this.handleRequest
    );
  }


  handleScroll = () => { 
    var lastLi = document.querySelector("ul.container > li:last-child");
    var lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
    var pageOffset = window.pageYOffset + window.innerHeight;
    
    if (pageOffset > lastLiOffset) {
          this.loadMore();
    }
  };

  handleClick = async (e) =>{
  
    e.preventDefault();
  
  if(this.state.type){
    this.handleRequest(`&type=${this.state.type}`);
  }
   else if(this.state.year){
     this.handleRequest(`&y=${this.state.year}`)
  }
    else{
      this.handleRequest();
    }
  }

  // componentDidMount() {
  //   // Detect when scrolled to bottom.
  //   this.refs.myscroll.addEventListener("scroll", () => {
  //     if (
  //       this.refs.myscroll.scrollTop + this.refs.myscroll.clientHeight >=
  //       this.refs.myscroll.scrollHeight
  //     ) {
  //       this.loadMore();
  //     }
  //   });
  // }

      
    render(){
      const { searchQuery, movies, options , year, types } = this.state;
      return(
        
        <div className="container">
          <div className="search">
              <form>
              <select className="search--by" onChange={this.handleOption}>
                <option defaultValue>Search By :</option>
                
                {
                   options.map((option,id) => <option value={option} key={id}>{option}</option>)  
                }
              </select>
                <label>Search: </label> 
                <input className="search--input" type="search" value={searchQuery} onChange={this.handleChange}/>
                <input className="search--year" type="text" value={year} placeholder="Year" onChange={this.handleYear}/>
                <select className="search--type" onChange={this.handleType}>
                  <option className="search__type--option" defaultValue>Type</option>
                  
                  {
                    types.map((type,id) => <option className="search__type--option" value={type} key={id}>{type}</option>)  
                  }
                </select>
                <button className="search--btn" type="submit" onClick={this.handleClick}>Search</button>
              </form>
          
          </div>
          {/* <Movies  movies={movies} handleSroll={this.handleSroll}/> */}
          <div>
            <ul className="result" onScroll={this.handleSroll}>
            {
              Array.isArray(movies.Search)  ? movies.Search.map((movie,id) => 
              <li className="movie" key={id}>  
                    <img className="movie--poster" src={movie.Poster === 'N/A' ? broken : movie.Poster } alt=""/>                
                                    
                    <p className="movie--title">{movie.Title}</p>            
              </li> )
              : <li className="movie">
                    <img className="movie--poster" src={movies.Poster} alt=""/>
                    <p className="movie--title">{movies.Title}</p>
                </li>
            }
            </ul>
          </div>


        </div>
      )
    }
    
  }
  
  
  
  export default App;


  // cases to handle
  // if(this.state.year && this.state.type){

  // }


  // if search by series show search by season and episode 

  // if(type === 'series'){
  //   than show filters for season and episode
  //   And if type selected == episode 
  //   than add episode to query and set value by taking episode num from input tag 
  // }

