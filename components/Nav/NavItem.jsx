import React from 'react'
import { Link } from 'react-router-dom'

const NavItem = ({ title, href }) => {
    return (
        <Link to={href} className='nav__item'>
            {title}
        </Link>
    )
}

export default NavItem
