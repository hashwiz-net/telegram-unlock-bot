import React from 'react'

const Button = ({ className, linkButton, ...props }) => {
  const linkCls = `block link-button rounded-md ease-in-out text-white focus:outline-none`
  const btnCls = `block rounded-md ease-in-out text-white focus:outline-none`
  const classList = `${linkButton ? linkCls : btnCls} ${className ? className : ''}`

  if (linkButton) {
    return (
      <a className={classList} {...props} />
    )
  }

  return (
    <button
      type="button"
      className={classList}
      {...props}
    />
  )
}

export default Button
