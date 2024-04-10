import {Routes, Route} from 'react-router-dom';
import { SearchProvider } from './context/SearchContext';
import NavBar from './components/NavBar';
import PopularPage from './components/PopularPage';
import MovieDetailsPage from './components/MovieDetailsPage';
import TopRatedPage from './components/TopRatedPage';
import UpcomingMoviesPage from './components/UpcomingMoviesPage';
import SearchResultsPage from './components/SearchResultsPage';
import './App.css';

function App() {
  return (
    <>
      <SearchProvider >
        <NavBar />
        <Routes>
          <Route path='/' element={<PopularPage />} />
          <Route path='/top-rated' element={<TopRatedPage />} />
          <Route path='/upcoming' element={<UpcomingMoviesPage />} />
          <Route path='/movie/:id' element={<MovieDetailsPage />} />
          <Route path='/search/:query' element={<SearchResultsPage />} />
        </Routes>
      </SearchProvider>
    </>
  );
}

export default App;
