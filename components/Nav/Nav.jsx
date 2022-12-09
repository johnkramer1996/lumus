import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { systemSelectors } from 'store/selectors'
import { isActiveClass } from 'utils'
import NavDropdown from './NavDropdown'
import NavItem from './NavItem'

const Nav = React.memo(({ items = [], isActive }) => {
   const { categories } = useSelector(systemSelectors.getCategories)

   return (
      <nav className={`nav${isActiveClass(isActive, 'nav--active')}`}>
         <div className='nav__wrap'>
            {/* <NavDropdown items={categories} /> */}
            {items.map((item, index) => (
               <NavItem key={index} {...item} />
            ))}
         </div>
      </nav>
   )
})

export default Nav
