import React from 'react'

export interface Article {
  pmid: string
  title: string
  journal: string
  pubdate: string
}

interface Props {
  articles: Article[]
  selected: string[]
  toggle: (pmid: string) => void
}

const ResultsTable: React.FC<Props> = ({ articles, selected, toggle }) => (
  <table className="table-auto w-full border mt-4">
    <thead>
      <tr>
        <th></th>
        <th>Title</th>
        <th>Journal</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {articles.map((a) => (
        <tr key={a.pmid} className="border-t">
          <td>
            <input
              type="checkbox"
              checked={selected.includes(a.pmid)}
              onChange={() => toggle(a.pmid)}
            />
          </td>
          <td>{a.title}</td>
          <td>{a.journal}</td>
          <td>{a.pubdate}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default ResultsTable
