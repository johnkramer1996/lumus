import React from 'react'

const CoursesItemTabReportStudentsItem = () => {
   return (
      <div className='course-report__table-item'>
         <div className='course-report__table-item-col'>
            <div className='course-report__table-user'>
               <div className='course-report__table-avatar'>
                  <img src='/assets/img/avatar2.jpg' alt='' />
               </div>
               <div className='course-report__table-info'>
                  <div className='course-report__table-name'>Мария Мариева</div>
                  <div className='course-report__table-lesson'>
                     <span>01</span>
                     <span>Название урока</span>
                  </div>
               </div>
            </div>
         </div>
         <div className='course-report__table-item-col'>
            <div className='course-report__table-status yellow-text'>Не приступил</div>
         </div>
      </div>
   )
}

export default CoursesItemTabReportStudentsItem
