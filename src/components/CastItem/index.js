import './style.css'

const CastItem = ({cast}) => {
    return (
        <li className='movie-details-cast-item'>
            {cast.profile_path === null ? <img src='/profile_placeholder.png' alt={cast.name} className='movie-details-cast-image' /> :
            <img src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} alt={cast.name} className='movie-details-cast-image' />}
            <p className='movie-details-cast-name'>{cast.name}</p>
            <p className='movie-details-cast-character'>Character: {cast.character}</p>
        </li>
    )
}

export default CastItem;