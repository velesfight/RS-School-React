import React, { ChangeEvent } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
}

interface SearchState {
  searchQuery: string;
}

class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchQuery: localStorage.getItem('searchQuery') || '',
    };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSearch = () => {
    const { searchQuery } = this.state;
    localStorage.setItem('searchQuery', this.state.searchQuery);
    this.props.onSearch(searchQuery);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.searchQuery}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default Search;
