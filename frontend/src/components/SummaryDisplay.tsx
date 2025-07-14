import React from 'react'

interface Props {
  data: Record<string, any>
}

const SummaryDisplay: React.FC<Props> = ({ data }) => (
  <div className="mt-4">
    {Object.entries(data).map(([pmid, content]) => (
      <div key={pmid} className="border p-2 mb-2">
        <h3 className="font-bold">PMID: {pmid}</h3>
        <pre className="whitespace-pre-wrap">{JSON.stringify(content, null, 2)}</pre>
      </div>
    ))}
  </div>
)

export default SummaryDisplay
