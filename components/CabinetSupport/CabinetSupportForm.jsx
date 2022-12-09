import React from 'react'

const CabinetSupportForm = () => {
   return (
      <div className='support__new'>
         <div className='support__item-img'>
            <img src='/assets/img/avatar2.jpg' alt='' />
         </div>
         <div className='support__new-text form-group'>
            <textarea placeholder='Написать ответ'></textarea>
         </div>
      </div>
   )
}

export default CabinetSupportForm
