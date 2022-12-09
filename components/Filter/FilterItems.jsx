import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import FilterItem from './FilterItem'
import { isActiveClass } from 'utils'

const FilterItems = ({ onChange, title, items = [], ...rest }) => {
   const minItems = 2
   const [isVisible, setIsVisible] = useState(false)
   const maxItems = minItems

   useEffect(() => {
      items.findLastIndex((i) => i.isChecked) + 1 && setIsVisible(true)
   }, [items])

   return (
      <div className='filter__items'>
         <div className='filter__items-top'>
            <div className='filter__items-title'>{title}</div>
            <button className='filter__items-refresh'>Сбросить</button>
         </div>
         <div className={`filter__items-wrap${isActiveClass(isVisible, 'filter__items-wrap--show')}`}>
            {items.map((props, index) => (
               <FilterItem key={index} {...props} {...rest} isHidden={index >= maxItems} onChange={onChange} />
            ))}

            {items.length > maxItems && (
               <button className='filter__items-all' onClick={() => setIsVisible(!isVisible)}>
                  <i>
                     <svg width='16' height='9' viewBox='0 0 16 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M15 1L8 8L1 1' stroke='#9FADBF' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                     </svg>
                  </i>
                  <span className='filter__items-all-show'>Показать еще {items.length - maxItems}</span>
                  <span className='filter__items-all-hide'>Скрыть</span>
               </button>
            )}
         </div>
      </div>
   )
}

FilterItems.propTypes = {
   onChange: PropTypes.func.isRequired,
   title: PropTypes.string.isRequired,
   items: PropTypes.array.isRequired,
   activeParams: PropTypes.array,
}

export default FilterItems
