import { useState, ChangeEvent } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search = ({ onSearch }: SearchProps): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState<string>(
    localStorage.getItem('searchQuery') || ''
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    const trimQuery = searchQuery.trim();
    localStorage.setItem('searchQuery', trimQuery);
    onSearch(trimQuery);
  };

  return (
    <div>
      <input type="text" value={searchQuery} onChange={handleChange} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
