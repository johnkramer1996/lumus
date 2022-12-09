import React from 'react'

const CabinetTotal = ({ children, total }) => {
   return (
      <div className='cabinet-page__nav'>
         <div className='cabinet-page__total'>{total}</div>
         {children}
      </div>
   )
}

export default CabinetTotal
