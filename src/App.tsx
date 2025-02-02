import { Component } from 'react';
import Search from './Search';
import Results from './Results';

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

    const apiUrl = `https://stapi.co/api/v1/rest/character/search?name=${query}&page=${page}&limit=10`;

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
          gender: character.gender,
          birthYear: character.birthYear,
        }));

        this.setState({ results: getResults, isLoading: false });
      })
      .catch((error: Error) => {
        this.setState({ error: error.message, isLoading: false });
      });
  };

  handleSearch = (query: string) => {
    this.setState({ currentPage: 1 });
    this.fetchCharacters(query.trim(), 1);
  };

  render() {
    return (
      <div>
        <h1>Search</h1>
        <Search onSearch={this.handleSearch} />
        {this.state.isLoading ? (
          <p>Loading...</p>
        ) : this.state.error ? (
          <p style={{ color: 'red' }}>{this.state.error}</p> // Сообщение об ошибке
        ) : (
          <Results results={this.state.results} />
        )}
      </div>
    );
  }
}

export default App;
