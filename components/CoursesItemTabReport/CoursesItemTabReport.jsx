import React from 'react'
import CoursesItemTabReportDynamics from './CoursesItemTabReportDynamics'
import CoursesItemTabReportItem from './CoursesItemTabReportItem'
import CoursesItemTabReportStudents from './CoursesItemTabReportStudents'

const CoursesItemTabReport = () => {
   const statistics = [
      { name: 'Начало курса', desc: '12.10.2021' },
      { name: 'Дней со старта', desc: '50 дней' },
      { name: 'Всего уроков', desc: '24 урока' },
      { name: 'Всего учеников', desc: '35 учеников' },
      { name: 'Процент завершивших', desc: '63%' },
   ]

   return (
      <div className='course-report'>
         <h3 className='course-report__title display-3'>Отчет по курсу</h3>
         <div className='course-report__top card-bg'>
            <div className='course-report__top-form-group form-group'>
               <label>Курс</label>
               <select>
                  <option defaultValue hidden>
                     Курс
                  </option>
                  <option>Курс 1</option>
                  <option>Курс 2</option>
               </select>
            </div>
            <div className='course-report__items'>
               {statistics.map((props, index) => (
                  <CoursesItemTabReportItem key={props.id || index} {...props} />
               ))}
            </div>
         </div>
         <div className='course-report__nav'>
            <div className='course-report__tabs'>
               <div className='course-report__tab course-report__tab--active'>Ученики</div>
               <div className='course-report__tab'>Динамика курса</div>
            </div>
            <div className='course-report__selects'>
               <select>
                  <option>Все статусы</option>
                  <option>Все статусы 2</option>
               </select>
               <select>
                  <option>За месяц</option>
                  <option>За месяц 2</option>
               </select>
            </div>
         </div>
         <CoursesItemTabReportStudents />
         <CoursesItemTabReportDynamics />
      </div>
   )
}

export default CoursesItemTabReport
