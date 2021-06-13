import React from 'react'

const Text = ({ className, ...props }) => {
  return (
    <p 
      className={`gray-text text-center ${className}`}
      {...props}
    />
  )
}

export default Text
