import { Breadcrumbs, Button, LoaderWrapper, User } from 'components/ui'
import { useDispatch, useRequest } from 'hooks'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { authSelectors } from 'store/selectors'
import { declOfNum, getDate, getDeclOfArray, getFullName, getTime, getURL, hasAccess, isActiveClass } from 'utils'
import { ROLES, TIME_NAMES_OBJ } from 'constants'
import { ReactComponent as ShareSvg } from 'svg/share.svg'
import { ReactComponent as EditSvg } from 'svg/edit.svg'

const EventsItem = ({ event, isLoading }) => {
   const { eventId } = useParams()
   const { setContent, addUserToEvent, removeUserFromEvent } = useDispatch()
   const role = useSelector(authSelectors.getRole)
   const user = useSelector(authSelectors.getUser)
   const { id, image, title, text, edate, etime, durationName, durationNumber, allUsers, eventType, user: userEvent = {}, users = [] } = event
   const { name: typeName } = eventType || {}
   const { id: user_id } = user
   const isUserPage = user_id === userEvent.id
   const hasAccessEdit = hasAccess(role, [ROLES.EMPLOYEE]) || isUserPage
   const hasAccessEnrolle = !hasAccessEdit || hasAccess(role, [ROLES.USER])

   const [enrolledPage, setEnrolledPage] = useState(false)

   useEffect(() => {
      setEnrolledPage(users.find((u) => +u.id === +user_id))
   }, [event])

   const addUserToEventRequest = useRequest(addUserToEvent, false, {
      success: () => {
         setEnrolledPage(true)
         setContent({ title: 'Успешно добавлен' })
      },
   })

   const removeUserFromEventRequest = useRequest(removeUserFromEvent, false, {
      success: () => {
         setEnrolledPage(false)
         setContent({ title: 'Успешно удалено' })
      },
   })

   const onEnroll = (action) => {
      if (!user_id) {
         setContent({ title: 'Чтобы записатся - авторизируйтесь!' })
         return
      }
      if (action === 'add' && enrolledPage) {
         setContent({ title: 'Вы уже записаны на курс' })
         return
      }

      ;(action === 'add' ? addUserToEventRequest : removeUserFromEventRequest).call({ eventId })
   }

   return (
      <section className='event-page'>
         <div className='container'>
            <div className='event-page__inner'>
               <aside className='event-page__left'>
                  <div className='event-page__card'>
                     <LoaderWrapper isLoading={isLoading}>
                        <div className='event-page__card-img img img--md img--cover'>
                           <img src={getURL.img(image)} alt='' />
                        </div>
                        {hasAccessEnrolle && (
                           <>
                              <Button className='event-page__card-btn' onClick={onEnroll.bind(null, 'add')} disabled={enrolledPage}>
                                 {!enrolledPage ? 'Записаться' : 'Вы уже записаны'}
                              </Button>
                              <div className='event-page__card-hint'>Запись бесплатна</div>
                              {enrolledPage && (
                                 <Button className='event-page__share' onClick={onEnroll.bind(null, 'remove')} outline>
                                    Отписаться
                                 </Button>
                              )}
                           </>
                        )}
                        {hasAccessEdit && (
                           <>
                              <div className='event-page__card-num'>
                                 {allUsers} {declOfNum(allUsers, getDeclOfArray['members'])}
                              </div>
                              <Button to={`${getURL.cabinetEventsEdit({ eventId })}`} className='event-page__card-btn event-page__card-btn--edit' outline link>
                                 <EditSvg />
                                 <span>Редактировать</span>
                              </Button>
                           </>
                        )}
                     </LoaderWrapper>
                  </div>
                  <Button className='event-page__share' outline>
                     <ShareSvg />
                     <span>Поделиться</span>
                  </Button>
               </aside>
               <div className='event-page__right'>
                  <LoaderWrapper isLoading={isLoading}>
                     <div className='event-page__top'>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                           {hasAccess(role, [ROLES.USER, ROLES.TRAINER]) && <Breadcrumbs items={[{ to: getURL.cabinetEvents(), title: 'Мои мероприятия' }]} />}
                           <User user={userEvent} role={ROLES.TRAINER}></User>
                        </div>
                        <h1 className='event-page__title display-3'>{title}</h1>
                     </div>
                     <div className='event-page__badges'>
                        <div className='event-page__badge'>
                           <span>Дата</span>
                           <strong>{getDate(edate)}</strong>
                        </div>
                        <div className='event-page__badge'>
                           <span>Тип</span>
                           <strong>{typeName}</strong>
                        </div>
                        <div className='event-page__badge'>
                           <span>Начало (по МСК)</span>
                           <strong>в {getTime(etime)}</strong>
                        </div>
                        <div className='event-page__badge'>
                           <span>Длительность</span>
                           <strong>~{(durationNumber || 0) + ' ' + declOfNum(durationNumber, getDeclOfArray[durationName])}</strong>
                        </div>
                     </div>
                     <div className='event-page__desc'>
                        <h3 className='event-page__desc-title'>Описание</h3>
                        <div className='event-page__desc-item' dangerouslySetInnerHTML={{ __html: text }}></div>
                     </div>
                  </LoaderWrapper>
               </div>
            </div>
         </div>
      </section>
   )
}

export default EventsItem
