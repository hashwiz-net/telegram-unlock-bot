import React from 'react'
import Text from './Text'

const ErrorText = ({ className, ...props }) => {
  return (
    <Text
      className={`text-red-700 ${className}`}
      {...props}
    />
  )
}

export default ErrorText
