import { Component } from 'react';
import Search from './Search';
import Results from './Results';
import Spinner from './Spinner';

interface Character {
  uid: string;
  name: string;
  gender: string;
  birthYear: number;
}
interface AppState {
  results: Character[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  currentPage: number;
  allPages: number;
}

class App extends Component<Record<string, unknown>, AppState> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      results: [],
      isLoading: false,
      error: null,
      searchQuery: localStorage.getItem('searchQuery') || '',
      currentPage: 1,
      allPages: 0,
    };
  }

  componentDidMount() {
    this.fetchCharacters(this.state.searchQuery, this.state.currentPage);
  }

  fetchCharacters = (query: string, page: number) => {
    this.setState({ isLoading: true, error: null, searchQuery: query });
    localStorage.setItem('searchQuery', query);

    const apiUrl = query
      ? `https://stapi.co/api/v1/rest/character/search?name=${query}&page=${page}&limit=10`
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

        this.setState({
          results: getResults,
          isLoading: false,
          allPages: this.state.allPages || 1,
        });
      })
      .catch((error: Error) => {
        this.setState({
          error: error.message,
          isLoading: false,
        });
      });
  };

  handleSearch = (query: string) => {
    this.setState({ currentPage: 1 });
    this.fetchCharacters(query.trim(), 1);
  };

  handlePageChange = (page: number) => {
    if (page >= 1 && page <= this.state.allPages) {
      this.setState({ currentPage: page });
      this.fetchCharacters(this.state.searchQuery, page);
    }
  };

  triggerError = () => {
    throw new Error('test error!');
  };

  render() {
    return (
      <div>
        <h2>Search</h2>
        <Search onSearch={this.handleSearch} />
        <h2>Result</h2>
        {this.state.isLoading ? (
          <Spinner />
        ) : this.state.error ? (
          <p>{this.state.error}</p> // Сообщение об ошибке
        ) : (
          <Results results={this.state.results} />
        )}
        {this.state.allPages > 1 && (
          <div>
            <button
              onClick={() => this.handlePageChange(this.state.currentPage - 1)}
              disabled={this.state.currentPage === 1}
            >
              Prev
            </button>
            <span>
              {' '}
              Page {this.state.currentPage} of {this.state.allPages}{' '}
            </span>
            <button
              onClick={() => this.handlePageChange(this.state.currentPage + 1)}
              disabled={this.state.currentPage === this.state.allPages}
            >
              Next
            </button>
          </div>
        )}
        <button onClick={this.triggerError}>Check</button>
      </div>
    );
  }
}

export default App;
