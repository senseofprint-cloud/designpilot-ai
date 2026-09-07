import React, { useRef, useState } from 'react'
import { UploadCloud, CheckCircle2, Loader2 } from 'lucide-react'

/**
 * props: { onFile: (file: File|null) => void, status: 'idle'|'analyzing'|'done' }
 */
export default function UploadBox({ onFile, status = 'idle' }) {
  const inputRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)

  function handleFiles(files) {
    if (files && files[0]) onFile(files[0])
    else onFile(null)
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
      className={`border-2 border-dashed rounded-xl2 py-14 px-5 text-center bg-gradient-to-b from-[#FAF9FF] to-white cursor-pointer transition-colors ${dragOver ? 'border-brand-purple' : 'border-brand-border hover:border-brand-purple'}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*,application/pdf"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      {status === 'analyzing' ? (
        <>
          <div className="w-14 h-14 rounded-2xl grad-cool text-white flex items-center justify-center mx-auto mb-4">
            <Loader2 size={22} className="animate-spin" />
          </div>
          <h3 className="text-lg font-semibold mb-1.5">Analyzing your design…</h3>
          <p className="text-brand-navySoft text-sm">Checking typography, contrast, spacing and hierarchy</p>
        </>
      ) : status === 'done' ? (
        <>
          <div className="w-14 h-14 rounded-2xl grad-fresh text-white flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={22} />
          </div>
          <h3 className="text-lg font-semibold mb-1.5">Design analyzed</h3>
          <p className="text-brand-navySoft text-sm">Click to analyze another design</p>
        </>
      ) : (
        <>
          <div className="w-14 h-14 rounded-2xl grad-cool text-white flex items-center justify-center mx-auto mb-4">
            <UploadCloud size={22} />
          </div>
          <h3 className="text-lg font-semibold mb-1.5">Drop your design here, or click to upload</h3>
          <p className="text-brand-navySoft text-sm">PNG, JPG or PDF — this demo uses a sample report either way</p>
        </>
      )}
    </div>
  )
}
