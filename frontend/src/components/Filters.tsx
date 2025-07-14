import React from 'react'

interface FilterState {
  yearStart?: number
  yearEnd?: number
  articleType?: string
}

interface Props {
  filters: FilterState
  setFilters: (f: FilterState) => void
}

const Filters: React.FC<Props> = ({ filters, setFilters }) => (
  <div className="flex space-x-2 my-2">
    <input
      type="number"
      placeholder="Year start"
      value={filters.yearStart || ''}
      className="border p-2"
      onChange={(e) => setFilters({ ...filters, yearStart: Number(e.target.value) })}
    />
    <input
      type="number"
      placeholder="Year end"
      value={filters.yearEnd || ''}
      className="border p-2"
      onChange={(e) => setFilters({ ...filters, yearEnd: Number(e.target.value) })}
    />
    <input
      placeholder="Article type"
      value={filters.articleType || ''}
      className="border p-2"
      onChange={(e) => setFilters({ ...filters, articleType: e.target.value })}
    />
  </div>
)

export default Filters
