
import { Link } from 'react-router-dom';
import './style.css'

const MovieItem = ({movie}) => {
    return (
        <li className='popular-movie-item'>
            <Link to={`/movie/${movie.id}`} className='popular-movie-link'>
                {movie.poster_path === null ?
                    <img src='/profile_placeholder.png' alt='placeholder' className='popular-movie-image' /> : 
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className='popular-movie-image' />
                }
                <h2 className='popular-movie-title'>{movie.title}</h2>
                <p className='popular-movie-rating'>Rating: {movie.vote_average.toFixed(1)}</p>
            </Link>
        </li>
    )
}

export default MovieItem;