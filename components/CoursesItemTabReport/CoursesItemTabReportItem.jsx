import React from 'react'

const CoursesItemTabReportItem = ({ name, desc }) => {
   return (
      <div className='course-report__item'>
         <span className='course-report__item-title'>{name}</span>
         <div className='course-report__item-desc'>{desc}</div>
      </div>
   )
}

export default CoursesItemTabReportItem
