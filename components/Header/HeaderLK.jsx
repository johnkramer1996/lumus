import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { cabinetLinks } from 'routes'
import { useDispatch, useEvent } from 'hooks/'
import { getURL, hasAccess, isActiveClass } from 'utils'
import { useSelector } from 'react-redux'
import { ReactComponent as LogoutSvg } from 'svg/logout.svg'
import { authSelectors } from 'store/selectors'
import { ROLES } from 'constants'

const HeaderLK = () => {
   const { setRole, logout } = useDispatch()
   const user = useSelector(authSelectors.getUser)
   const roleIds = useSelector(authSelectors.getRoleIds)
   const role = useSelector(authSelectors.getRole)
   const [isActive, setIsActive] = useState(true)
   useEvent((e) => !e.target.closest('.header__lk') && setIsActive(false))

   const onChangeRole = (role) => {
      setRole(role)
      // setIsActive(false)
   }

   console.log(roleIds)

   return (
      <div className='header__lk'>
         <div className='header__lk-avatar' onClick={() => setIsActive(!isActive)}>
            <img src={getURL.avatar(user.avatar, role)} alt='' />
         </div>
         <div className={`header__lk-dropdown${isActiveClass(isActive, 'header__lk-dropdown--active')}`}>
            {cabinetLinks
               .filter((item) => !item.hasAccess || hasAccess(role, item.hasAccess))
               .map(({ title, href, number }, index) => (
                  <Link key={index} to={href} className={`header__lk-item ${isActiveClass(number, 'header__lk-item--notification')}`} onClick={() => setIsActive(false)}>
                     <span>{title}</span>
                     <i>{number}</i>
                  </Link>
               ))}
            {Object.entries(ROLES)
               .filter(([_, role]) => roleIds.includes(role))
               .map(([name, role], index) => (
                  <button key={index} className='header__lk-item' onClick={onChangeRole.bind(null, role)}>
                     Войти как {name}
                  </button>
               ))}
            <button className='header__lk-item header__lk-item--logout' onClick={logout}>
               <span>Выйти из аккаунта</span>
               <LogoutSvg style={{ width: '16px' }} />
            </button>
         </div>
      </div>
   )
}

export default HeaderLK
