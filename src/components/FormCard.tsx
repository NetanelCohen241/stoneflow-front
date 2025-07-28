import React from 'react'

export default function FormCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-md w-full bg-white p-6 rounded shadow-md">{children}</div>
  )
}
