import React from 'react'
import { Link } from 'react-router-dom'

const Button = React.memo(({ children, className, color = 'blue', light, outline, text, link, to = '', disabled, ...props }) => {
   const classNames = [outline ? 'btn-outline' : light ? `btn-light-${color}` : `btn-${color}`, className]

   disabled && classNames.push('btn--disabled')

   return (
      <>
         {link ? (
            <Link to={to} className={`btn ${classNames.join(' ')}`}>
               {children}
            </Link>
         ) : (
            <button className={`btn ${classNames.join(' ')}`} {...props}>
               {children}
            </button>
         )}
      </>
   )
})

export default Button
