import {useParams} from 'react-router-dom'
import {format} from 'date-fns'
import { useEffect, useState } from 'react'
import { Oval } from 'react-loader-spinner'
import CastItem from '../CastItem'
import './style.css'
import SearchInput from '../SearchInput'

const apiStatusConstants = {
    initial: 'INITIAL',
    loading: 'LOADING',
    success: 'SUCCESS',
    failure: 'FAILURE'
}

const MovieDetailsPage = () => {

    const [movieDetails, setMovieDetails] = useState({})
    const [cast, setCast] = useState([])
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

    useEffect(() => {
        fetchMovieDetails()
    }, [])

    const {id} = useParams()

    const fetchMovieDetails = async () => {
        setApiStatus(apiStatusConstants.loading)
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_MOVIE_ACCESS_TOKEN}`
            }
        }
        try {
            const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
            const response = await fetch(url, options)
            const data = await response.json()
            if(response.ok === true) {
                setMovieDetails(data)
            }
            const castUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
            const castResponse = await fetch(castUrl, options)
            const castData = await castResponse.json()
            if(response.ok) {
                setCast(castData.cast)
            }
            setApiStatus(apiStatusConstants.success)
        } catch (error) {
            setApiStatus(apiStatusConstants.failure)
        }
    }

    const styles = {
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    const renderLoader = () => {
        return (
            <div className='loader-container' style={{height: '85vh'}}>
                <Oval
                    visible={true}
                    height="45"
                    width="45"
                    color="#ffffff"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        )
    }

    const renderFailure = () => {
        return (
            <div className='failure-container'>
                <h1 className='failure-text'>Failed to fetch data</h1>
                <button className='retry-button' onClick={fetchMovieDetails}>Retry</button>
            </div>
        )
    }

    const renderMovieDetails = () => (
        <>
            <div className='movie-details-main-card-con'>
                <div className='movie-details-content'>
                    <div className='movie-details-image-con'>
                        <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.title} className='movie-details-image' />
                        <div className='movie-details-text'>
                            <h1 className='movie-details-title'>{movieDetails.title}</h1>
                            <p className='movie-details-rating'>Rating : {movieDetails.vote_average.toFixed(1)}</p>
                            <div className='movie-details-genres-runtime'>
                                <p className='movie-details-runtime'>{movieDetails.runtime} min</p>
                                <p className='movie-details-genres'>{movieDetails.genres && movieDetails.genres.map((genre) => genre.name).join(', ')}</p>
                            </div>
                            <p className='movie-details-release-date'>Release Date : {format(new Date(movieDetails.release_date), 'EEE MMM dd yyyy')}</p>
                        </div>
                    </div>
                    <div className='movie-details-overview'>
                        <h2 className='movie-details-overview-heading'>Overview</h2>
                        <p className='movie-details-overview-text'>{movieDetails.overview}</p>
                    </div>
                </div>
                <div className='movie-details-backdrop' style={styles}></div>
            </div>
            <div className='movie-details-cast-con'>
                <h2 className='movie-details-cast-heading'>Cast</h2>
                <ul className='movie-details-cast-list'>
                    { cast.map((actor) => ( <CastItem key={actor.id} cast={actor} /> )) }
                </ul>
            </div>
        </>
    )

    const renderSwitchCase = () => {
        switch(apiStatus) {
            case apiStatusConstants.loading:
                return renderLoader()
            case apiStatusConstants.failure:
                return renderFailure()
            case apiStatusConstants.success:
                return renderMovieDetails()
            default:
                return null
        }
    }

    return (
        <div className='movie-details-page-container'>
            <SearchInput />
            {renderSwitchCase()}
        </div>
    )
}

export default MovieDetailsPage;