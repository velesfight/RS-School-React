import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Search from './Search';
import Results from './Results';
import Spinner from './Spinner';
import Pagination from './PAgination';
import React from 'react';

interface Character {
  uid: string;
  name: string;
  gender: string;
}

const App = (): JSX.Element => {
  const navigate = useNavigate();
  const { page } = useParams<{ page?: string }>();
  console.log('Current page from URL:', page);
  const [results, setResults] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(
    localStorage.getItem('searchQuery') || ''
  );
  const [currentPage, setCurrentPage] = useState<number>(
    page ? parseInt(page, 10) : 0
  );
  const [allPages, setAllPages] = useState<number>(0);
  const [details, setDetails] = useState<boolean>(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  useEffect(() => {
    if (page) {
      setCurrentPage(parseInt(page, 10) || 1);
    }
  }, [page]);

  const fetchCharacters = (query: string, page: number) => {
    console.log(`Fetching data for query: ${query}, page: ${page}`);
    setIsLoading(true);
    setError(null);
    setSearchQuery(query);
    localStorage.setItem('searchQuery', query);

    const apiUrl = query
      ? `https://stapi.co/api/v1/rest/character/search?name=${query}&page=${page - 1}&limit=10`
      : `https://stapi.co/api/v1/rest/character/search?page=${page}&limit=10`;

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error('error update data');
        }
        return res.json();
      })
      .then((data) => {
        const getResults = data.characters.map((character: Character) => ({
          uid: character.uid,
          name: character.name,
          gender: character.gender || 'Unknown',
        }));

        setResults(getResults);
        setIsLoading(false);
        setAllPages(data.page?.totalPages || 1);
      })
      .catch((error: Error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    console.log(
      `Current state - searchQuery: ${searchQuery}, currentPage: ${currentPage}`
    );
    fetchCharacters(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  const handleSearch = (query: string) => {
    setCurrentPage(1);
    navigate(`/search/1`);
    fetchCharacters(query.trim(), 1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= allPages) {
      setCurrentPage(page);
      navigate(`/search/${page}`);
      fetchCharacters(searchQuery, page);
    }
  };

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
    setDetails(true);
    navigate(`/search/${currentPage}/details/${character.uid}`);
  };

  const handleCloseDetails = () => {
    setDetails(false);
    setSelectedCharacter(null);
    navigate(`/search/${currentPage}`);
  };
  const handleLeftSectionClick = () => {
    if (details) {
      setDetails(false); // Закрытие правой секции при клике на левую секцию
      setSelectedCharacter(null);
      navigate(`/search/${currentPage}`);
    }
  };
  const triggerError = () => {
    throw new Error('test error!');
  };

  return (
    <div className="container-fluid d-flex">
      <div className="col-md-8" onClick={handleLeftSectionClick}>
        <h2>Search</h2>
        <Search onSearch={handleSearch} />
        <h2>Result</h2>
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <Results results={results} onClick={handleCharacterClick} />
        )}
        {allPages > 1 && (
          <Pagination
            currentPage={currentPage}
            allPages={allPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <div className="col-md-4" style={{ paddingLeft: '20px' }}>
        {details && selectedCharacter && (
          <div className="border p-3">
            <button
              className="btn btn-secondary mb-2"
              onClick={handleCloseDetails}
            >
              Close Details
            </button>
            <Outlet />
          </div>
        )}
      </div>
      <div className="position-relative" style={{ minHeight: '100vh' }}>
        <button
          className="btn btn-secondary position-absolute bottom-0 end-0 m-3"
          onClick={triggerError}
        >
          Check
        </button>
      </div>
    </div>
  );
};

export default App;
