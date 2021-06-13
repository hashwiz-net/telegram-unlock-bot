import React from 'react'

const Button = ({ className, ...props }) => {
  return (
    <button
      type="button"
      className={`btn btn-primary ${className ? className : ''}`}
      {...props}
    />
  )
}

export default Button
