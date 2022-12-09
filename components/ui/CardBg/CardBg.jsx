import React from 'react'

const CardBg = ({ children, className = '', ...props }) => {
   return (
      <div className={`card-bg ${className}`} {...props}>
         {children}
      </div>
   )
}

export default CardBg
