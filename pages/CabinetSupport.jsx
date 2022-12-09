import { Cabinet, CabinetSupportForm, CabinetSupportItem, CabinetTitle, Comments } from 'components'
import { Button, CardBg, CardsLoaderWrapper, EventCabinetLoader, FaqLoader, User } from 'components/ui'
import { ROLES } from 'constants'
import { LIMIT } from 'constants'
import { useDispatch, useRequest } from 'hooks'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { pagesSelectors, settingsSelectors, applicationsSelectors } from 'store/selectors'
import { getFullName, getURL } from 'utils'

const CabinetSupport = () => {
   const { resetApplications, setApplications, addSubscribe, fetchApplications, putSubscribe, deleteSubscribe } = useDispatch()
   const page = useSelector(settingsSelectors.getPage)
   const { total, isLastPage } = useSelector(applicationsSelectors.getData)
   const items = useSelector(applicationsSelectors.getApplications)

   const fetchApplicationsRequest = useRequest(fetchApplications, true, { testDelay: 300 })
   const addSubscribeRequest = useRequest(addSubscribe)
   const putSubscribeRequest = useRequest(putSubscribe)
   const deleteSubscribeRequest = useRequest(deleteSubscribe)

   const limit = LIMIT.CABINET_EVENT
   const sortBy = 'id.desc'

   useEffect(() => fetchApplicationsRequest.call({ page, limit, sortBy }), [page])
   useEffect(() => () => resetApplications(), [])

   return (
      <Cabinet>
         <div className='requests'>
            <CabinetTitle title={'Заявки'}></CabinetTitle>
            {/* Новые */}
            {/* В обработке */}
            {/* Завершенные */}
            <div className='requests__group card-bg'>
               <div className='requests__group-top'>
                  <div className='requests__group-title'>Новые</div>
                  <div className='requests__group-num'>2 заявки</div>
               </div>
               <CardsLoaderWrapper Loader={FaqLoader} length={items.length} isLoading={fetchApplicationsRequest.isLoading} isLastPage={isLastPage}>
                  {(loader) => {
                     return (
                        <CardBg className='requests__items'>
                           {items.map(({ id, user, status }) => (
                              <div className='requests__item'>
                                 <div className='requests__item-top'>
                                    <div className='requests__item-top-left'>
                                       <div className='requests__item-id'>#{id}</div>
                                       <div className='requests__item-status'>{status}</div>
                                    </div>
                                    <div className='requests__item-time'>3 ч 20 мин</div>
                                 </div>
                                 <div className='requests__item-user'>
                                    <User user={user}></User>
                                 </div>
                                 <div className='requests__item-text'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium placerat dignissim convallis metus, interdum ultrices placerat et, ipsum. In velit neque mauris
                                    vulputate felis. Enim nibh habitasse at vestibulum sit placerat amet. Tristique sagittis vitae pellentesq..
                                 </div>
                              </div>
                           ))}
                           {loader}
                           <CabinetSupportForm />
                        </CardBg>
                     )
                  }}
               </CardsLoaderWrapper>
               <div className='requests__group-bottom'>
                  <button className='requests__group-all'>Показать все</button>
               </div>
            </div>
         </div>
         {/* <CardsLoaderWrapper Loader={FaqLoader} length={items.length} isLoading={fetchApplicationsRequest.isLoading} isLastPage={isLastPage}>
            {(loader) => {
               return (
                  <CardBg className='support__items'>
                     {items.map((item) => (
                        <CabinetSupportItem key={item} />
                     ))}
                     {loader}
                     <CabinetSupportForm />
                  </CardBg>
               )
            }}
         </CardsLoaderWrapper> */}
         {/* <Button>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
               <path d='M5 12L9.66798 17L19 7' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
            <span>Мой вопрос решен</span>
         </Button> */}
      </Cabinet>
   )
}

export default CabinetSupport
