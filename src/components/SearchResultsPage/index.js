import Pagination from 'rc-pagination';
import {useParams} from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import MovieItem from '../MovieItem';
import { Oval } from 'react-loader-spinner';
import SearchInput from '../SearchInput';

const SearchResultsPage = () => {

    const initialPage = parseInt(new URLSearchParams(window.location.search).get('page')) || 1;

    const {search} = useContext(SearchContext);

    const [searchMovies, setSearchMovies] = useState([])
    const [page, setPage] = useState(initialPage);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false);

    const {query} = useParams();

    useEffect(() => {
        fetchPopularMovies()
        updateUrl(page);
    }, [page, query])

    


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

    const fetchPopularMovies = async () => {
        setLoading(true)
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&query=${search}&page=${page}`
        const response = await fetch(url)
        const data = await response.json()
        setSearchMovies(data.results)
        setTotalItems(data.total_pages)
        setLoading(false)
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

    return (
        <div className='popular-page-container'>
            <h1 className='popular-page-heading'>Search results for: <span className='search-text'>`{search}`</span></h1>
            <SearchInput />
            <ul className='popular-movies-list'>
                {   loading ? renderLoader() :
                    searchMovies.map((movie) => {
                        return <MovieItem key={movie.id} movie={movie} />
                    })
                }
            </ul>
            <Pagination
                current={page}
                total={totalItems}
                pageSize={1}
                onChange={handlePageChange}
                className="pagination-class"
                itemRender={itemRender}
                showSizeChanger
            />
        </div>
    )
}

export default SearchResultsPage;