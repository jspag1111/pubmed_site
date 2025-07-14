import React, { useState } from 'react'

interface Props {
  fields: string[]
  setFields: (f: string[]) => void
}

const ExtractionSchemaForm: React.FC<Props> = ({ fields, setFields }) => {
  const [input, setInput] = useState('')

  const addField = () => {
    if (input.trim()) {
      setFields([...fields, input.trim()])
      setInput('')
    }
  }

  return (
    <div className="my-2">
      <div className="flex space-x-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2"
          placeholder="Field name"
        />
        <button className="bg-green-500 text-white px-4" onClick={addField}>
          Add field
        </button>
      </div>
      <div className="mt-2">
        {fields.map((f) => (
          <span key={f} className="inline-block mr-2 bg-gray-200 px-2 py-1">
            {f}
          </span>
        ))}
      </div>
    </div>
  )
}

export default ExtractionSchemaForm
