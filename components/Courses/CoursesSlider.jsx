import React from 'react'
import CoursesCardSlider from '../Courses/CoursesCardSlider'
import { Swiper } from 'components/ui/'

const Course = ({ title = 'Курсы', items = [], className }) => {
   return (
      <section className={`course-slider ${className}`}>
         <div className='container'>
            <div className='course-slider__inner'>
               <h2 className='course-slider__title display-2'>{title}</h2>
               {items.length > 1 && (
                  <div className='course-slider__tabs'>
                     <div className='course-slider__tab course-slider__tab--active'>Все категории</div>
                     {items.map(({ id, name }) => (
                        <div key={id} className='course-slider__tab'>
                           {name}
                        </div>
                     ))}
                  </div>
               )}

               <div className='course-slider__wrap'>
                  <Swiper items={items[0]?.items} className={''} prefix={'course-slider'} options={{ slidesPerView: 3 }}>
                     {(props) => <CoursesCardSlider {...props} />}
                  </Swiper>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Course
