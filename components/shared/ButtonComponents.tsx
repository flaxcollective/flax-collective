'use client'

import React from "react"

type ButtonProps = {
  text: string
  icon?: React.ReactNode
  onClick?: () => void
}

export default function ButtonComponents({ text, icon , onClick }: ButtonProps) {
  return (
    <button className="primary_btn " onClick={onClick}>
      {text}
      {icon && <span>{icon}</span>}
    </button>
  )
}