import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { RouteNames } from 'routes'
import { coursesSelectors } from 'store/selectors'
import { getURL, isActiveClass, timer } from 'utils'
import { Button } from 'components/ui'

const CoursesItemInfo = ({ onEnroll, isEnrolledPage }) => {
   const { courseId } = useParams()
   const course = useSelector(coursesSelectors.getCourse)
   const modules = useSelector(coursesSelectors.getModules)
   const lessons = useSelector(coursesSelectors.getLessons)
   const prices = useSelector(coursesSelectors.getPrices)
   const whoms = useSelector(coursesSelectors.getWhoms)

   const { description } = course
   const descriptions = course.descriptions || []
   const result_learn_text = course.result_learn_text || []
   const { id: lessonId } = course.test_lesson || {}
   const { price, price_with_sale } = prices[0] || {}

   console.log(lessons)

   const days = useRef()
   const hours = useRef()
   const minutes = useRef()
   const seconds = useRef()
   useEffect(() => timer(days, hours, minutes, seconds), [])

   return (
      <section className='course-info2'>
         <div className='container'>
            <div className='course-info2__inner'>
               <div className='course-info2__left'>
                  <div className='course-about course-info2__group'>
                     <div className='course-info2__group-show'>
                        <h3 className='course-info2__title'>О курсе</h3>
                        <div className='course-about__desc' dangerouslySetInnerHTML={{ __html: description }} />
                     </div>
                     {/* // TODO MODILE VERSION */}
                     {descriptions.map(({ name, text, image }, index) => (
                        <div key={index} className='course-info2__group-hidden'>
                           <h3 className='course-info2__title'>{name}</h3>
                           <div className='course-about__img'>
                              <img src={getURL.img(image)} alt='' />
                           </div>
                           <div className='course-about__desc' dangerouslySetInnerHTML={{ __html: text }} />
                        </div>
                     ))}
                     <button className='course-info2__show'>
                        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                           <path d='M19 8.5L12 15.5L5 8.5' stroke='#9FADBF' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                        </svg>
                        <span className='course-info2__show-open'>Показать больше</span>
                        <span className='course-info2__show-close'>Скрыть</span>
                     </button>
                  </div>
                  <div className='course-whom course-info2__group'>
                     <h3 className='course-info2__title'>Кому подойдет курс</h3>
                     {/* // TODO MODILE VERSION */}
                     {whoms.map(({ name, text, image }, index) => (
                        <div key={index} className='course-info2__group-hidden'>
                           <div className='course-whom__item'>
                              <div className='course-whom__item-img img img--cover'>
                                 <img src={getURL.img(image)} alt='' />
                              </div>
                              <div className='course-whom__item-content'>
                                 <div className='course-whom__item-title truncate'>{name}</div>
                                 <div className='course-whom__item-desc' dangerouslySetInnerHTML={{ __html: text }} />
                              </div>
                           </div>
                        </div>
                     ))}
                     <button className='course-info2__show'>
                        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                           <path d='M19 8.5L12 15.5L5 8.5' stroke='#9FADBF' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                        </svg>
                        <span className='course-info2__show-open'>Показать больше</span>
                        <span className='course-info2__show-close'>Скрыть</span>
                     </button>
                  </div>
                  <div className='course-result course-info2__group'>
                     <h3 className='course-info2__title'>Результаты обучения</h3>
                     <div className='course-result__wrap'>
                        {result_learn_text.map((item, index) => (
                           <div key={index} className='course-result__item'>
                              <i></i>
                              <span>{item}</span>
                           </div>
                        ))}
                     </div>
                  </div>
                  <div className='course-programm course-info2__group'>
                     <h3 className='course-info2__title'>Программа курса</h3>
                     <div className='course-programm__wrap'>
                        {modules.map(({ id, name, lessons }, index) => (
                           <div key={id || index} className='course-programm__group'>
                              <div className='course-programm__title'>{name}</div>
                              <ol className='course-programm__list'>
                                 {lessons.map(({ id, name }, index) => (
                                    <li key={id || index} className='course-programm__item'>
                                       <Link to={`${RouteNames.COURSES}/${courseId}/lessons/${id}`}>{name}</Link>
                                    </li>
                                 ))}
                              </ol>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
               <div className='course-info2__right'>
                  <div className='course-info2__cart'>
                     <div className='course-info2__cart-top'>
                        <div className='course-info2__cart-prices'>
                           <div className='course-info2__cart-prices-new'>{price} руб.</div>
                           <div className='course-info2__cart-prices-old'>{price_with_sale} руб.</div>
                        </div>
                        <div className='course-info2__cart-buttons'>
                           <Button className={`course-info2__cart-btn${isActiveClass(isEnrolledPage, 'btn--disabled')}`} onClick={onEnroll}>
                              {!isEnrolledPage ? 'Записаться' : 'Вы уже записаны'}
                           </Button>
                           <Button to={getURL.cabinetCoursesLesson({ courseId, lessonId })} className='course-info2__cart-btn course-info2__cart-btn--free' outline link>
                              Пройти бесплатный урок
                           </Button>
                        </div>
                     </div>
                     <div className='course-info2__timer'>
                        <div className='course-info2__timer-title'>Скидка исчезнет через</div>
                        <div className='course-info2__timer-wrap'>
                           <div ref={days} className='course-info2__timer-item'></div>
                           <div className='course-info2__timer-separate'>:</div>
                           <div ref={hours} className='course-info2__timer-item'></div>
                           <div className='course-info2__timer-separate'>:</div>
                           <div ref={minutes} className='course-info2__timer-item'></div>
                           <div className='course-info2__timer-separate'>:</div>
                           <div ref={seconds} className='course-info2__timer-item course-info__timer-item--sek'></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default CoursesItemInfo
