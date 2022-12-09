import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { declOfNum, getDeclOfArray, getURL, isActiveClass, timer } from 'utils'
import { ReactComponent as PlaySvg } from 'svg/play.svg'
import { Button } from 'components/ui'
import { coursesSelectors, systemSelectors } from 'store/selectors'
import { useEffect } from 'react'

const CoursesItemInfo = ({ onEnroll, isEnrolledPage }) => {
   const course = useSelector(coursesSelectors.getCourse)
   const prices = useSelector(coursesSelectors.getPrices)
   const { types, formats } = useSelector(systemSelectors.getCategories)

   const { image, name, shortDesc, width_number, width_name, type = [], format = [], anytime, timing } = course
   const { price, price_with_sale } = prices[0] || {}
   const { name: typeName } = types.find(({ id }) => id === type.id) || {}
   const { name: foramtName } = formats.find(({ id }) => id === format.id) || {}
   const where = anytime === 1 ? 'В любое время' : timing || ''

   const days = useRef()
   const hours = useRef()
   const minutes = useRef()
   const seconds = useRef()
   useEffect(() => timer(days, hours, minutes, seconds), [])

   //  const _width_name = (TIME_NAMES.find(({ id }) => id === width_name) || {}).name || ''

   return (
      <section className='course-info'>
         <div className='container'>
            <div className='course-info__inner'>
               <div className='course-info__left'>
                  <div className='course-info__img img img--lg'>
                     <img src={getURL.img(image)} alt='' />
                  </div>
               </div>

               <div className='course-info__right'>
                  <h1 className='course-info__title display-2'>{name}</h1>
                  <div className='course-info__desc' dangerouslySetInnerHTML={{ __html: shortDesc }} />
                  <div className='course-info__badges'>
                     <div className='course-info__badge'>
                        <span>Длительность</span>
                        <strong>
                           {width_number} {declOfNum(width_number, getDeclOfArray[width_name])}
                        </strong>
                     </div>
                     <div className='course-info__badge'>
                        <span>Тип обучения</span>
                        <strong>{typeName}</strong>
                     </div>
                     <div className='course-info__badge'>
                        <span>Формат</span>
                        <strong>{foramtName}</strong>
                     </div>
                     <div className='course-info__badge'>
                        <span>Когда</span>
                        <strong>{where}</strong>
                     </div>
                  </div>
                  <button className='course-info__btn btn btn-outline'>
                     <PlaySvg />
                     <span>Смотреть трейлер курса</span>
                  </button>
                  <div className='course-info__cart'>
                     <div className='course-info__cart-top'>
                        <div className='course-info__cart-prices'>
                           <div className='course-info__cart-prices-new'>{price} руб.</div>
                           <div className='course-info__cart-prices-old'>{price_with_sale} руб.</div>
                        </div>
                        <div className='course-info__cart-right'>
                           <Button className={`course-info__cart-btn${isActiveClass(isEnrolledPage, 'btn--disabled')}`} onClick={onEnroll}>
                              {!isEnrolledPage ? 'Записаться' : 'Вы уже записаны'}
                           </Button>
                           <div className='course-info__cart-places'>Осталось 12 мест</div>
                        </div>
                     </div>
                     <div className='course-info__timer'>
                        <div className='course-info__timer-title'>Скидка исчезнет через</div>
                        <div className='course-info__timer-wrap'>
                           <div ref={days} className='course-info__timer-item'></div>
                           <div className='course-info__timer-separate'>:</div>
                           <div ref={hours} className='course-info__timer-item'></div>
                           <div className='course-info__timer-separate'>:</div>
                           <div ref={minutes} className='course-info__timer-item'></div>
                           <div className='course-info__timer-separate'>:</div>
                           <div ref={seconds} className='course-info__timer-item course-info__timer-item--sek'></div>
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
