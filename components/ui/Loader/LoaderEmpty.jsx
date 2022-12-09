import React from 'react'

const LoaderEmpty = () => {
   return (
      <div className='cabinet-student__empty'>
         {Array(3)
            .fill(0)
            .map((_, i) => (
               <div key={i} className='cabinet-student__empty-item'>
                  <div className='cabinet-student__empty-item-top'></div>
                  <div className='cabinet-student__empty-block'>
                     <div className='cabinet-student__empty-item-top2'>
                        <span></span>
                        <span></span>
                     </div>
                     <div className='cabinet-student__empty-item-bottom'></div>
                     <div className='cabinet-student__empty-item-bottom2'></div>
                  </div>
               </div>
            ))}
         <div className='cabinet-student__empty-hint'>
            Пока что пользователь не записался на <br /> участие в ваших мероприятиях ;(
         </div>
      </div>
   )
}

export default LoaderEmpty
