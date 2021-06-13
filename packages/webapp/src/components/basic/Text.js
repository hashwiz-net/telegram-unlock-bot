import React from 'react'

const Text = ({ className, ...props }) => {
  return (
    <p 
      className={`text-gray-400 text-center ${className}`}
      {...props}
    />
  )
}

export default Text
