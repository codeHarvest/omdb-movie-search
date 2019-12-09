import React from 'react'
import broken from './assets/placeholder_broken.png';

 const Movies = ({movies, handleSroll}) => {
    return (
        <div>
            <ul className="result"onScroll={handleSroll}>
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
    )
}

export default Movies;