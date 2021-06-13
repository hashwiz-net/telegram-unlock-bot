import React from 'react'

const Title = ({ className, ...props }) => {
  return (
    <h1 
      className={`font-bold text-center ${className}`}
      {...props}
    />
  )
}

export default Title
