import React from 'react'
import { Link } from 'react-router-dom'
import { RouteNames } from 'routes/'
import { ReactComponent as LogoImg } from 'assets/img/logo.svg'

const Logo = () => {
    return (
        <Link to={RouteNames.HOME} className='header__logo'>
            <LogoImg />
        </Link>
    )
}

export default Logo
