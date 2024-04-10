import Pagination from 'rc-pagination';
import { useEffect, useState } from 'react';
import MovieItem from '../MovieItem';
import { Oval } from 'react-loader-spinner';
import SearchInput from '../SearchInput';

const apiStatusConstants = {
    initial: 'INITIAL',
    loading: 'LOADING',
    success: 'SUCCESS',
    failure: 'FAILURE'
}

const UpcomingMoviesPage = () => {

    const initialPage = parseInt(new URLSearchParams(window.location.search).get('page')) || 1;

    const [popularMovies, setPopularMovies] = useState([])
    const [page, setPage] = useState(initialPage);
    const [totalItems, setTotalItems] = useState(0);
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)



    useEffect(() => {
        fetchUpcomingMovies()
        updateUrl(page);
    }, [page])


    const handlePageChange = (page) => {
        setPage(page)
    };

    const itemRender = (current, type, element) => {
        if (type === 'page') {
        return (
            <button className={`pagination-button ${current === page ? "activePage" : ""}`} key={current} onClick={() => handlePageChange(current)}>
            {current}
            </button>
        );
        }

        if (type === 'prev') {
        return (
            <button className={`pagination-button ${page === 1 ? "endPage" : ""}`} title="Previous" key="prev" onClick={() => handlePageChange(current - 1)}>
            {'<'}
            </button>
        );
        }

        if (type === 'next') {
        return (
            <button className={`pagination-button ${totalItems <= page ? "endPage" : ""}`} title="Next" key="next" onClick={() => handlePageChange(current + 1)}>
            {'>'}
            </button>
        );
        }

        if (type === 'jump-prev' || type === 'jump-next') {
        return <span className="pagination-dots" title='more'>...</span>;
        }

        return element;
    };

    const updateUrl = (page) => {
        const url = new URL(window.location.href);
        url.searchParams.set('page', page);
        window.history.pushState({}, '', url);
    };

    const fetchUpcomingMovies = async () => {
        setApiStatus(apiStatusConstants.loading)
        const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=${page}`
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_MOVIE_ACCESS_TOKEN}`
            }
        }
        try {
            const response = await fetch(url, options)
            const data = await response.json()
            if(response.ok) {
                setPopularMovies(data.results)
                setTotalItems(data.total_pages)
                setApiStatus(apiStatusConstants.success)
            } else {
                setApiStatus(apiStatusConstants.failure)
            }
        } catch (error) {
            setApiStatus(apiStatusConstants.failure)
        }
    }

    const renderLoader = () => {
        return (
            <div className='loader-container'>
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
                <button className='retry-button' onClick={fetchUpcomingMovies}>Retry</button>
            </div>
        )
    }

    const renderMovies = () => {
        return popularMovies.map((movie) => {
            return <MovieItem key={movie.id} movie={movie} />
        })
    }

    const renderSwitchCase = () => {
        switch(apiStatus) {
            case apiStatusConstants.loading:
                return renderLoader()
            case apiStatusConstants.failure:
                return renderFailure()
            case apiStatusConstants.success:
                return renderMovies()
            default:
                return null
        }
    }

    return (
        <div className='popular-page-container'>
            <h1 className='popular-page-heading'>Upcoming Movies</h1>
            <SearchInput />
            <ul className='popular-movies-list'>
                {renderSwitchCase()}
            </ul>
            {
                totalItems > 1 && <Pagination
                    current={page}
                    total={totalItems}
                    pageSize={1}
                    onChange={handlePageChange}
                    className="pagination-class"
                    itemRender={itemRender}
                    showSizeChanger
                />
            }
        </div>
    )
}

export default UpcomingMoviesPage;