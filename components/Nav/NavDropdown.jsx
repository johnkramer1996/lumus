import { useEvent } from 'hooks'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { RouteNames } from 'routes'
import { isActiveClass } from 'utils'
import { ReactComponent as ArrowDownSvg } from 'svg/arrow-down.svg'

const NavDropdown = ({ items = [] }) => {
   const [isActive, setIsActive] = useState(false)
   useEvent((e) => !e.target.closest('.nav__dropdown') && setIsActive(false))

   return (
      <div className='nav__dropdown'>
         <div className={`nav__dropdown-show${isActiveClass(isActive, 'nav__dropdown-show--active')}`} onClick={() => setIsActive(!isActive)}>
            <span>Курсы</span>
            <ArrowDownSvg />
         </div>
         <div className='nav__dropdown-hidden'>
            <Link to={`${RouteNames.COURSES}`} className='nav__dropdown-link' onClick={() => setIsActive(false)}>
               Все
            </Link>
            {items.map(({ id, name }, index) => (
               <Link key={id || index} to={`${RouteNames.COURSES}?category=${id}`} className='nav__dropdown-link' onClick={() => setIsActive(false)}>
                  {name}
               </Link>
            ))}
         </div>
      </div>
   )
}

export default NavDropdown
