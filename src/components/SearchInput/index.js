import React, { useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext';
import './style.css'

const SearchInput = () => {

    const { search, setSearch } = useContext(SearchContext)
    
    const navigate = useNavigate()

    const handleSearchInput = (e) => {
        setSearch(e.target.value)
    }

    const handleSearch = () => {
        if(search === '') {
            return
        }
        navigate(`/search/${search}`)
    }

    const onPressEnter = (e) => {
        if(e.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <div className='search-input-con'>
            <input type='search' className='search-input' placeholder='Search Movies' value={search} onChange={handleSearchInput} onKeyDown={onPressEnter} style={{width: "90%", maxWidth: "400px"}} />
            <button type='button' className='search-button' style={{marginLeft: "10px"}} onClick={handleSearch}>Search</button>
        </div>
    )
}

export default SearchInput;