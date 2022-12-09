import React from 'react'

const CoursesItemTabReportDynamics = () => {
   return (
      <div className='course-report__content'>
         <div className='course-report__items course-report__items--num card-bg'>
            <div className='course-report__item'>
               <span className='course-report__item-title'>Количество учеников</span>
               <div className='course-report__item-desc'>11 учеников</div>
            </div>
            <div className='course-report__item'>
               <span className='course-report__item-title'>Среднее прохождение урока</span>
               <div className='course-report__item-desc'>1.5 дня</div>
            </div>
         </div>

         <div className='course-report__table course-report__table2 card-bg'>
            <div className='course-report__table-inner'>
               <div className='course-report__table-head'>
                  <div className='course-report__table-head-col'>№</div>
                  <div className='course-report__table-head-col'>Название</div>
                  <div className='course-report__table-head-col'>Прохождение</div>
               </div>
               <div className='course-report__table-items'>
                  <div className='course-report__table-item'>
                     <div className='course-report__table-item-col'>
                        <div className='course-report__table-num'>01</div>
                     </div>
                     <div className='course-report__table-item-col'>
                        <div className='course-report__table-title'>Название урока</div>
                     </div>
                     <div className='course-report__table-item-col'>
                        <div className='course-report__table-duration'>1 день</div>
                     </div>
                  </div>
                  <div className='course-report__table-item'>
                     <div className='course-report__table-item-col'>
                        <div className='course-report__table-num'>01</div>
                     </div>
                     <div className='course-report__table-item-col'>
                        <div className='course-report__table-title'>Название урока</div>
                     </div>
                     <div className='course-report__table-item-col'>
                        <div className='course-report__table-duration'>1 день</div>
                     </div>
                  </div>
                  <div className='course-report__table-item'>
                     <div className='course-report__table-item-col'>
                        <div className='course-report__table-num'>01</div>
                     </div>
                     <div className='course-report__table-item-col'>
                        <div className='course-report__table-title'>Название урока</div>
                     </div>
                     <div className='course-report__table-item-col'>
                        <div className='course-report__table-duration'>1 день</div>
                     </div>
                  </div>
                  <div className='course-report__table-item'>
                     <div className='course-report__table-item-col'>
                        <div className='course-report__table-num'>01</div>
                     </div>
                     <div className='course-report__table-item-col'>
                        <div className='course-report__table-title'>Название урока</div>
                     </div>
                     <div className='course-report__table-item-col'>
                        <div className='course-report__table-duration'>1 день</div>
                     </div>
                  </div>
                  <div className='course-report__table-item'>
                     <div className='course-report__table-item-col'>
                        <div className='course-report__table-num'>01</div>
                     </div>
                     <div className='course-report__table-item-col'>
                        <div className='course-report__table-title'>Название урока</div>
                     </div>
                     <div className='course-report__table-item-col'>
                        <div className='course-report__table-duration'>1 день</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default CoursesItemTabReportDynamics
