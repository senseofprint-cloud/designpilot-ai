import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="text-6xl font-display font-bold bg-clip-text text-transparent grad-vivid mb-3" style={{ WebkitBackgroundClip: 'text' }}>404</div>
      <h1 className="text-2xl font-semibold mb-2">This page doesn't exist</h1>
      <p className="text-brand-navySoft mb-6">The page you're looking for may have been moved or renamed.</p>
      <Link to="/"><Button>Back to Home</Button></Link>
    </div>
  )
}
