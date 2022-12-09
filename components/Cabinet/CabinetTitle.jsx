import React from 'react'

const CabinetTitle = ({ children, title }) => {
   return (
      <div className='cabinet-page__top'>
         <h2 className='display-3'>{title}</h2>
         <div>{children}</div>
      </div>
   )
}

export default CabinetTitle
