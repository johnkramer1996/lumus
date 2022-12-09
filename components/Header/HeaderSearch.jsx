import { useEvent } from 'hooks'
import React, { useEffect, useState } from 'react'

const HeaderSearch = ({ isActive: isActiveNav }) => {
    const [isActive, setIsActive] = useState(false)

    useEffect(() => setIsActive(isActiveNav), [isActiveNav])

    useEvent((e) => !e.target.closest('.header__search') && setIsActive(false))

    return (
        <div className={`header__search${isActive ? ' header__search--active' : ''}`}>
            <input type='text' placeholder='Поиск' />
            <button className='header__search-btn' onClick={() => setIsActive(true)}>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <circle cx='11.7659' cy='11.7659' r='8.98856' stroke='#1B2C3E' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                    <path d='M18.0195 18.4844L21.5436 21.9992' stroke='#1B2C3E' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                </svg>
            </button>
        </div>
    )
}

export default HeaderSearch
