import React from 'react'
import { saveAs } from 'file-saver'

interface Props {
  data: any
}

const ExportButton: React.FC<Props> = ({ data }) => {
  const save = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    saveAs(blob, 'results.json')
  }
  return (
    <button onClick={save} className="bg-purple-500 text-white px-4 py-2 my-2">
      Export JSON
    </button>
  )
}

export default ExportButton
