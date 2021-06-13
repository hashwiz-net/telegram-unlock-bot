import React from 'react'
import Text from './Text'

const ErrorText = ({ className, ...props }) => {
  return (
    <Text
      className={`error-text ${className}`}
      {...props}
    />
  )
}

export default ErrorText
