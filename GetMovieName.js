import React, { Component } from 'react';
import axios from 'axios';


export class GetMovieName extends Component {
  constructor(props) {
    super(props);

    this.state = {
        movieSearch:'',
        movieData:[]
      }
      
    }
  
  
      //send in title of the movie from input field to search for the movie data with the api 
      searchAPI = (name) => {
        var options = {
          method: 'GET',
          url: `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/${name}`,
          headers: {
            'x-rapidapi-key': '44aa493582msh9c7cdbdd96d71b7p1494ebjsnca6c4dd2d960',
            'x-rapidapi-host': 'imdb-internet-movie-database-unofficial.p.rapidapi.com'
          }
        };
      
      axios.request(options).then(function (response) {
        if(response.data.id === '' || response.data.title === ''){
          document.getElementsByClassName('movieDisplay')[0].innerHTML = `<div class = 'no-movie'>Movie not found. Please try again...</div>`;
        }
        else{
          var castMembers = '';
          for(let i = 0; i < response.data.cast.length; i++){
            var actor = response.data.cast[i].actor;
            var character = response.data.cast[i].character;
            castMembers += `<li> <b>Actor</b>: ${actor}, <b>Character</b>: ${character}</li>`; 
            
          }
        
          console.log(response.data);
          var newHTML =
          `
          <div class = "movieInfo"> 
          <div class = moviePoster>
          <img src = "${response.data.poster}" class = "moviePoster" alt-text="movie poster" />
          </div>
          
          <p class = "movie-info" id = "title">${response.data.title}</p>
          <p class = "movie-info" id = "plot">${response.data.plot}</p>
          <p class = "movie-info">Release year: ${response.data.year}</p>
          <p class = "movie-info">Length: ${response.data.length}</p>
          <p class = "movie-info">IMDB Rating: ${response.data.rating} with ${response.data.rating_votes} votes</p>
          <div class = "cast"> Cast Members:
          <ul class = "movie-info" id = "castMembers">
            ${castMembers}
          </ul>
          </div>
          <div class = movieTrailer>
          <iframe src="https://www.imdb.com/video/imdb/${response.data.trailer.id}/imdb/embed?autoplay=false&width=480" width="480" height="270" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" frameborder="no" scrolling="no"></iframe>
          </div>
          </div>
          
          
          `;

          document.getElementsByClassName('movieDisplay')[0].innerHTML = newHTML;
        }
      }).catch(function (error) {
        console.error(error);

      });
      
      }
      
  

    onChange = (e) => {
      this.setState({ movieSearch: e.target.value });
    }

    
      onSubmit = (e) => {
        e.preventDefault();
        this.setState({movieSearch: e});
        console.log(this.state.movieSearch);
        this.searchAPI(this.state.movieSearch);
        this.setState({movieSearch: ''});
      }

      componentDidMount = () => {
        document.getElementsByClassName('movieDisplay')[0].innerHTML = `<div class = 'no-movie'>Search for a movie above...</div>`;
      }

      clearForm = () => {
        document.getElementsByClassName('movieDisplay')[0].innerHTML = `<div class = 'no-movie'>Search for a movie above...</div>`;
      }
      
        render() {
          return (
        <div className="App">
          <header id = 'header'>
          <h1 className = "duffsApp">Duff's Movie App</h1>
          <div className = "search-box">
          <form onSubmit = {this.onSubmit} className = 'movieForm'>
                   <input 
                   type = 'text' 
                   name = 'search' 
                   style = {{display:"flex"}}
                   placeholder = 'Search for a movie...'
                   onChange = {this.onChange}
                   value = {this.state.movieSearch}
                    />
                   <input type = "submit" value = "Submit" className = "btn" />
                   <button type = "clear" value = "Clear" className = "btn" onClick = {this.clearForm}>Clear</button>
               </form>
          </div>
            
          </header>
          <div className = "movieDisplay"></div>
               
               
        </div>
    )}
}
export default GetMovieName;