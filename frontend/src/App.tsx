import { useState } from 'react'
import './index.css'
import SearchBar from './components/SearchBar'
import Filters from './components/Filters'
import ResultsTable, { Article } from './components/ResultsTable'
import ExtractionSchemaForm from './components/ExtractionSchemaForm'
import SummaryDisplay from './components/SummaryDisplay'
import ExportButton from './components/ExportButton'
import { search } from './api/pubmed'
import { summarize } from './api/summarize'

function App() {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({})
  const [results, setResults] = useState<Article[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [fields, setFields] = useState<string[]>([])
  const [summary, setSummary] = useState<any>({})

  const onSearch = async () => {
    const data = await search(query, filters)
    setResults(data.results || [])
  }

  const toggle = (pmid: string) => {
    setSelected((prev) =>
      prev.includes(pmid) ? prev.filter((p) => p !== pmid) : [...prev, pmid]
    )
  }

  const onSummarize = async () => {
    const data = await summarize(selected, fields)
    setSummary(data.summaries)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">PubMed Summarizer</h1>
      <SearchBar query={query} setQuery={setQuery} onSearch={onSearch} />
      <Filters filters={filters} setFilters={setFilters} />
      <ResultsTable articles={results} selected={selected} toggle={toggle} />
      <ExtractionSchemaForm fields={fields} setFields={setFields} />
      <button onClick={onSummarize} className="bg-blue-600 text-white px-4 py-2">
        Summarize
      </button>
      <ExportButton data={summary} />
      <SummaryDisplay data={summary} />
    </div>
  )
}

export default App
