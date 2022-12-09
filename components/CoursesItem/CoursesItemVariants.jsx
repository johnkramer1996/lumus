import { Button, Swiper } from 'components/ui'
import React from 'react'
import { useSelector } from 'react-redux'
import { coursesSelectors } from 'store/selectors'
import { declOfNum, getDeclOfArray } from 'utils'

const CoursesItemVariansts = () => {
   const prices = useSelector(coursesSelectors.getPrices)
   const modules = useSelector(coursesSelectors.getModules)

   prices.forEach((price) => {
      if (price.modules?.length) {
         price.modules = price.moduls.map((item) => modules[+item]).filter((item) => item)
         price.countLesson = price.modules.reduce((prev, module) => prev + module.lessons?.length, 0)
      }
   })

   return (
      <section className='course-variants'>
         <div className='container'>
            <div className='course-variants__inner'>
               <h2 className='course-variants__title display-2'>Выберите вариант участия </h2>
               <div className='course-variants__slider'>
                  <Swiper items={prices} className={''} prefix={'course-variants'} options={{ slidesPerView: 3, loop: false }}>
                     {({ id, name, width, price, price_with_sale, modules, countLesson }, index) => (
                        <div key={id} className='swiper-slide'>
                           <div className='tarif-card'>
                              <div className='tarif-card__title'>{name}</div>
                              <div className='tarif-card__desc'>
                                 {width} обучения, {countLesson} {declOfNum(countLesson, getDeclOfArray['lessons'])}
                              </div>
                              <div className='tarif-card__prices'>
                                 <div className='tarif-card__prices-new'>{price} руб.</div>
                                 <div className='tarif-card__prices-old'>{price_with_sale} руб.</div>
                              </div>
                              <div className='tarif-card__items'>
                                 {modules?.map(({ name }, index) => (
                                    <div className='tarif-card__item'>
                                       <i></i>
                                       <span>{name}</span>
                                    </div>
                                 ))}
                              </div>
                              <button className='tarif-card__open'>
                                 <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                    <path d='M19 9L12 16L5 9' stroke='#9FADBF' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                                 </svg>
                                 <span className='tarif-card__open-show'>Показать Описание</span>
                                 <span className='tarif-card__open-hidden'>Скрыть Описание</span>
                              </button>
                              <Button className='tarif-card__btn'>Выбрать</Button>
                           </div>
                        </div>
                     )}
                  </Swiper>
               </div>
            </div>
         </div>
      </section>
   )
}

export default CoursesItemVariansts
