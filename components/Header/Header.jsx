import React, { useCallback, useMemo, useState } from 'react'
import { HeaderBurger, HeaderLK, HeaderLogo, HeaderNotification, HeaderSearch } from './'
import { Nav } from 'components/'
import { Button } from 'components/ui/'
import { navLinks } from 'routes'
import { useSelector } from 'react-redux'
import { useDispatch } from 'hooks/'
import { useLocation } from 'react-router-dom'
import { authStepTypes } from 'store/reducers/auth/types'
import { authSelectors } from 'store/selectors'

const Header = () => {
   const { pathname } = useLocation()
   const { setType } = useDispatch()
   const isAuth = useSelector(authSelectors.getIsAuth)
   const [isNavActive, setIsNavActive] = useState(false)

   const onToggleNav = useCallback(() => setIsNavActive((prev) => !prev), [])
   const onShowModal = useCallback(() => {
      setType(authStepTypes.LOGIN)
   }, [setType])

   return (
      <header className={`header${pathname === '/' ? ' header--b0' : ''}`}>
         <div className='container'>
            <div className='header__inner'>
               <div className='header__left'>
                  <HeaderBurger onClick={onToggleNav} isActive={isNavActive} />
                  <HeaderLogo />
                  <Nav items={navLinks} isActive={isNavActive} />
               </div>
               <div className='header__right'>
                  <HeaderSearch isActive={isNavActive} />
                  {isAuth ? (
                     <div className='header__authed'>
                        <HeaderNotification />
                        <HeaderLK />
                     </div>
                  ) : (
                     <Button className='header__btn' onClick={onShowModal} light>
                        Войти
                     </Button>
                  )}
               </div>
            </div>
         </div>
      </header>
   )
}

export default Header
