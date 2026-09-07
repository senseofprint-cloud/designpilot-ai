import React from 'react'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, description, children, actions }) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 bg-brand-navy/55 backdrop-blur-sm z-[300] flex items-center justify-center p-5"
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.() }}
    >
      <div className="bg-white rounded-2xl p-7 max-w-[440px] w-full shadow-lifted animate-toastIn">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-[19px] font-semibold m-0">{title}</h3>
          <button onClick={onClose} className="text-brand-navySoft hover:text-brand-navy">
            <X size={18} />
          </button>
        </div>
        {description && <p className="text-brand-navySoft text-sm leading-relaxed mb-5">{description}</p>}
        {children}
        {actions && <div className="flex gap-2.5 justify-end mt-5">{actions}</div>}
      </div>
    </div>
  )
}
