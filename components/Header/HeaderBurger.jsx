import React from 'react'

const HeaderBurger = ({ onClick, isActive }) => {
    return (
        <button className={`header__burger${isActive ? ' header__burger--active' : ''}`} onClick={onClick}>
            <span></span>
            <span></span>
            <span></span>
        </button>
    )
}

export default HeaderBurger
