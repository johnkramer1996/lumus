import CoursesItemWrapper from 'components/Courses/CoursesItemWrapper'
import { Button } from 'components/ui'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { coursesSelectors } from 'store/selectors'

const CoursesItemPopular = () => {
   const interestes = useSelector(coursesSelectors.getInterestes)

   return (
      <section className='course-popular'>
         <div className='container'>
            <div className='course-popular__inner'>
               <div className='courses'>
                  <div className='courses__top'>
                     <h2 className='courses__title display-3'>Вам может быть интересно</h2>
                     <Button className='courses__all' outline>
                        Показать все
                     </Button>
                  </div>
                  <CoursesItemWrapper items={interestes} className='courses__items' numberComponent={1} amount={4} />
               </div>
            </div>
         </div>
      </section>
   )
}

export default CoursesItemPopular
