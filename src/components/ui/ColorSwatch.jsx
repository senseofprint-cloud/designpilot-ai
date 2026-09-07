import React from 'react'
import { useToast } from '../../context/ToastContext.jsx'

export default function ColorSwatch({ label, hex }) {
  const { showToast } = useToast()
  return (
    <button
      onClick={() => { navigator.clipboard?.writeText(hex); showToast(`Copied ${hex}`) }}
      className="rounded-2xl h-[120px] px-4 py-4 flex flex-col justify-end text-white text-left shadow-soft transition-transform hover:-translate-y-1"
      style={{ background: hex }}
    >
      <span className="text-[12.5px] font-bold">{label}</span>
      <span className="text-[11px] font-mono opacity-85 mt-0.5">{hex}</span>
    </button>
  )
}
