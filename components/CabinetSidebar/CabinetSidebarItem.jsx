import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { isActiveClass } from 'utils'

const CabinetSidebarItem = ({ title, href, number, index, search, list = [], filter = [] }) => {
   const location = useLocation()

   return (
      <>
         {!list.length ? (
            <Link key={index} to={href} className='sidebar__link'>
               <span>{title}</span>
               <i>{number}</i>
            </Link>
         ) : (
            <div key={index} className={`sidebar__item sidebar__item--notification${isActiveClass(location.pathname === href, 'sidebar__item--open')}`}>
               <Link to={{ pathname: href, search: '' }} className='sidebar__item-show'>
                  <span>{title}</span>
                  {/* <i>1</i> */}
               </Link>
               <div className='sidebar__item-hidden'>
                  <Link to={{ pathname: href, search: '' }} className={`sidebar__sublink${isActiveClass(search === '', 'sidebar__sublink--active')}`}>
                     <span>Все</span>
                     <i></i>
                  </Link>
                  {list.map(({ title, search }, index) => (
                     <Link
                        key={index}
                        to={{ pathname: href, search: `?${search}` }}
                        state={{ prevLocation: location }}
                        className={`sidebar__sublink${isActiveClass(filter[search]?.length || filter[`_${search}`]?.length, 'sidebar__sublink--active')}`}
                     >
                        <span>{title}</span>
                        <i></i>
                     </Link>
                  ))}
               </div>
            </div>
         )}
      </>
   )
}

export default CabinetSidebarItem
