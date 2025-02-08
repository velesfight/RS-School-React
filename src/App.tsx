import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Search from './Search';
import Results from './Results';
import Spinner from './Spinner';
import Details from './Details';

interface Character {
  uid: string;
  name: string;
  gender: string;
  birthYear: number;
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
          birthYear: character.birthYear,
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

  const triggerError = () => {
    throw new Error('test error!');
  };

  return (
    <div>
      <h2>Search</h2>
      <Search onSearch={handleSearch} />
      <Details />
      <h2>Result</h2>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Results results={results} />
      )}
      {allPages > 1 && (
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {allPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === allPages}
          >
            Next
          </button>
        </div>
      )}
      <button onClick={triggerError}>Check</button>
    </div>
  );
};

export default App;
