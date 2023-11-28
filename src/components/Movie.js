import React, { useState,useEffect } from 'react';
import './Movie.css'

function Movie() {

    const  [movieList, setMovieList] = useState([])

    const getMovie = () =>{
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=e51f28a87ebccb0f39f503bab17c05d5&language=pt-BR')
        .then(res => res.json())
        .then(json => setMovieList(json.results))
    }

        useEffect(()=> {
            getMovie()
        },[])

        console.log(movieList)

    return(
        <div class="list">
            {movieList.map ((movie)=>(
                <div class="filme">
                    <img class="poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
                    <h1 class="title">{movie.title}</h1>
                </div>
            ))}
        </div>
    )
}
export default Movie;