import React from "react";

interface SearchProps {
  searchQuery: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ searchQuery, handleSearch }) => (
  <div className="search-container">
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={handleSearch}
      className="search-input"
    />
  </div>
);

export default Search;
