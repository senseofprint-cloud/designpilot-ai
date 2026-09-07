import React, { createContext, useCallback, useContext, useRef, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const showToast = useCallback((message) => {
    const id = ++idRef.current
    setToasts((t) => [...t, { id, message }])
    setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.id !== id))
    }, 2800)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-5 right-5 z-[400] flex flex-col gap-2.5 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-center gap-2.5 rounded-xl bg-brand-navy text-white text-sm font-semibold px-4.5 py-3.5 shadow-lifted animate-toastIn"
          >
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-lime flex-shrink-0">
              <CheckCircle2 size={13} />
            </span>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}
