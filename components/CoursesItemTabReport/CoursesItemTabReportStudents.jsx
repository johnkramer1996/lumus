import React from 'react'
import CoursesItemTabReportItem from './CoursesItemTabReportItem'
import CoursesItemTabReportStudentsItem from './CoursesItemTabReportStudentsItem'

const CoursesItemTabReportStudents = () => {
   const statistics = [
      { name: 'Количество учеников', desc: '11 учеников' },
      { name: 'Процент завершивших', desc: '75%' },
   ]

   return (
      <div>
         <div className='course-report__content  course-report__content--active'>
            <div className='course-report__items course-report__items--num card-bg'>
               {statistics.map((props, index) => (
                  <CoursesItemTabReportItem key={props.id || index} {...props} />
               ))}
            </div>
            {/* // TODO GREEN TEXT */}
            {/* <div className='course-report__item-desc green-text'>75%</div> */}

            <div className='course-report__table card-bg'>
               <div className='course-report__table-inner'>
                  <div className='course-report__table-head'>
                     <div className='course-report__table-head-col'>Ученик</div>
                     <div className='course-report__table-head-col'>Статус</div>
                  </div>
                  <div className='course-report__table-items'>
                     {[{}].map((props, index) => (
                        <CoursesItemTabReportStudentsItem key={props.id || index} {...props} />
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default CoursesItemTabReportStudents
