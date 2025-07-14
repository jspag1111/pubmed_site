import React from 'react'

interface Props {
  query: string
  setQuery: (q: string) => void
  onSearch: () => void
}

const SearchBar: React.FC<Props> = ({ query, setQuery, onSearch }) => (
  <div className="my-2">
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="border p-2 mr-2"
      placeholder="Enter medical topic"
    />
    <button onClick={onSearch} className="bg-blue-500 text-white px-4 py-2">
      Search
    </button>
  </div>
)

export default SearchBar
