import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      {...props}
    >
      {children}
    </button>
  )
}
