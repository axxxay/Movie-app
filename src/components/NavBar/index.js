import {Link, useNavigate} from 'react-router-dom'
import { CgMenuRightAlt } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { useState, useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import './style.css'


const NavBar = () => {
    
    const [showMenu, setShowMenu] = useState(false)

    const { search, setSearch } = useContext(SearchContext)

    const navigate = useNavigate()

    const handleMenu = () => {
        setShowMenu(!showMenu)
    }

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
        <>
            <nav className="navbar">
                <h1 className='navbar-logo-text'><Link to='/' className='logo-link'>MovieDB</Link></h1>
                <ul className='navbar-list'>
                    <li className='navbar-item'><Link to='/' className='link'>Popular</Link></li>
                    <li className='navbar-item'><Link to='/top-rated' className='link'>Top Rated</Link></li>
                    <li className='navbar-item'><Link to='/upcoming' className='link'>Upcoming</Link></li>
                    <li className='navbar-item search-item'><input type='search' className='search-input' placeholder='Movie Name' value={search} onKeyDown={onPressEnter} onChange={handleSearchInput}/></li>
                    <li className='navbar-item search-item'><button type='button' className='search-button' onClick={handleSearch}>Search</button></li>
                </ul>
                <button type='button' className='menu-button' onClick={handleMenu}>
                    { showMenu ? <IoClose className='menu-icon' /> : <CgMenuRightAlt className='menu-icon' /> }
                </button>
            </nav>
            { showMenu &&
                <ul className='navbar-list-mobile'>
                    <li className='navbar-item'><Link to='/' onClick={handleMenu} className='link'>Popular</Link></li>
                    <li className='navbar-item'><Link to='/top-rated'  onClick={handleMenu} className='link'>Top Rated</Link></li>
                    <li className='navbar-item'><Link to='/upcoming'  onClick={handleMenu} className='link'>Upcoming</Link></li>
                </ul>
            }
        </>
    )
}

export default NavBar;