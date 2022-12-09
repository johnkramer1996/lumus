import { Button, CardBg } from 'components/ui'
import { ROLES } from 'constants'
import React from 'react'
import { useSelector } from 'react-redux'
import { authSelectors, usersSelectors } from 'store/selectors'
import { getFullName, getURL, hasAccess } from 'utils'
import CabinetSidebarLoader from './CabinetSidebarLoader'
import { ReactComponent as EditSvg } from 'svg/edit.svg'
import { useParams } from 'react-router-dom'

const CabinetSidebarUser = ({ isLoading }) => {
   const { userId, trainerId } = useParams()
   const role = useSelector(authSelectors.getRole)
   const user = useSelector(usersSelectors.getUser)
   const { email, phone, vacationStart, vacationEnd } = user
   const isUserPage = user.id === (userId || trainerId)

   return (
      <>
         {isLoading ? (
            <CabinetSidebarLoader />
         ) : (
            <CardBg className='cabinet-student__card'>
               <div className='cabinet-student__card-img'>
                  <img src={getURL.avatar(user.avatar)} alt='' />
               </div>
               <div className='cabinet-student__card-name'>{getFullName(user)}</div>
               {hasAccess(role, [ROLES.EMPLOYEE]) && (
                  <div className='cabinet-student__card-balls'>
                     <i></i>
                     <span>340 баллов</span>
                  </div>
               )}
               {isUserPage && (
                  <Button to={`${getURL.cabinetSettings()}`} className='cabinet-student__card-btn' outline link>
                     <EditSvg />
                     <span>Редактировать</span>
                  </Button>
               )}
               <div className='cabinet-student__card-bottom'>
                  <div className='cabinet-student__card-item'>
                     <span className='cabinet-student__card-item-title'>Email</span>
                     <a className='cabinet-student__card-item-link' href={`mailto:${email}`}>
                        {email}
                     </a>
                  </div>
                  {hasAccess(role, [ROLES.TRAINER, ROLES.EMPLOYEE]) && (
                     <div className='cabinet-student__card-item'>
                        <span className='cabinet-student__card-item-title'>Телефон</span>
                        <a className='cabinet-student__card-item-link' href={`tel:${phone}`}>
                           {phone}
                        </a>
                     </div>
                  )}
                  {hasAccess(role, [ROLES.EMPLOYEE]) && vacationStart && vacationEnd && (
                     <div className='cabinet-student__card-item'>
                        <span className='cabinet-student__card-item-title'>Отпуск</span>
                        <p className='cabinet-student__card-item-text'>
                           с {vacationStart} до {vacationEnd}
                           {/* с {getDate(vacationStart, { isYear: false })}
                           до {getDate(vacationEnd, { isYear: false })} */}
                        </p>
                     </div>
                  )}
               </div>
            </CardBg>
         )}
      </>
   )
}

export default React.memo(CabinetSidebarUser)
