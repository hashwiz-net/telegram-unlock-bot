import React from 'react'
import Text from './Text'

const SuccessText = ({ className, ...props }) => {
  return (
    <Text
      className={`text-green-700 ${className}`}
      {...props}
    />
  )
}

export default SuccessText
