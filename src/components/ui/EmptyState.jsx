import React from 'react'
import Button from './Button.jsx'

export default function EmptyState({ icon: Icon, title, description, actionLabel, onAction }) {
  return (
    <div className="text-center py-16 px-5 border-[1.5px] border-dashed border-brand-border rounded-xl2 bg-gradient-to-b from-[#FAF9FF] to-white">
      <div className="w-[60px] h-[60px] rounded-2xl grad-primary text-white flex items-center justify-center mx-auto mb-4">
        {Icon && <Icon size={26} />}
      </div>
      <h3 className="text-lg font-semibold mb-1.5">{title}</h3>
      <p className="text-brand-navySoft text-sm mb-5">{description}</p>
      {actionLabel && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  )
}
