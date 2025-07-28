import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-md shadow hover:opacity-90 transition"
      {...props}
    >
      {children}
    </button>
  )
}
