import React, { useState } from 'react'
import { isActiveClass } from 'utils'
import { ReactComponent as ArrowDownSvg } from './svg/arrow-down.svg'

const FaqItem = ({ question, answer }) => {
   const [isActive, setIsActive] = useState(false)

   return (
      <div className={`faq__item${isActiveClass(isActive, 'faq__item--open')}`}>
         <div className='faq__item-show' onClick={() => setIsActive(!isActive)}>
            <span>{question}</span>
            <button className='faq__item-btn'>
               <ArrowDownSvg />
            </button>
         </div>
         <div className='faq__item-hidden'>{answer}</div>
      </div>
   )
}

export default FaqItem
