import { Button } from 'components/ui'
import React from 'react'

const CourseDetailItem = ({ title, descr, btn, stock, date, price, priceOld }) => {
   return (
      <div className='course-detail__item-wrap'>
         <div className='course-detail__item-badge'>
            <strong>{stock}</strong>
            <span>{date}</span>
         </div>
         <h3 className='course-detail__item-title display-2'>{title}</h3>
         <div className='course-detail__item-desc'>{descr}</div>
         <div className='course-detail__item-bottom'>
            <Button className='course-detail__item-btn'>{btn}</Button>
            <div className='course-detail__item-prices'>
               <div className='course-detail__item-prices-new'>{price}</div>
               <div className='course-detail__item-prices-old'>{priceOld}</div>
            </div>
         </div>
      </div>
   )
}

export default CourseDetailItem
