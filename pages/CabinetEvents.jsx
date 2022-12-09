import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Cabinet, CabinetTitle, CabinetTotal, EventsCardCabinet } from 'components'
import { useSelector } from 'react-redux'
import { useDispatch, useQuery, useRequest } from 'hooks'
import { authSelectors, eventsSelectors, settingsSelectors } from 'store/selectors'
import { getRequest, getTotal, getURL } from 'utils'
import { Button, CardsLoaderWrapper, EventCabinetLoader, Loader, LoaderWrapper } from 'components/ui'
import { createSearchParams, useLocation } from 'react-router-dom'
import { LIMIT } from 'constants'
import { ReactComponent as AddSvg } from 'svg/add-sm.svg'

const CabinetEvents = () => {
   const location = useLocation()
   const query = useQuery()
   const { resetFilter, resetEvents, fetchEvents, fetchUserEvents } = useDispatch()
   const { setFilter } = useDispatch()
   const page = useSelector(settingsSelectors.getPage)
   const filter = useSelector(settingsSelectors.getFilter)
   const role = useSelector(authSelectors.getRole)
   const { total, isLastPage } = useSelector(eventsSelectors.getData)
   const events = useSelector(eventsSelectors.getEvents)

   const roleRequest = [fetchUserEvents, fetchEvents, fetchEvents, fetchEvents][role - 1]
   const fetchEventsRequest = useRequest(roleRequest, true, { testDelay: 300 })

   const limit = LIMIT.CABINET_EVENT
   const sortBy = 'id.desc'

   useEffect(() => {
      setFilter({ ...filter, ...getFilter() })
      return () => {
         resetEvents()
         resetFilter()
      }
   }, [location, role])

   useEffect(() => () => resetEvents(), [role])

   useEffect(() => {
      fetchEventsRequest.call({ page, limit, sortBy, ...getFilter() })
   }, [location, page, role])

   const getFilter = () => {
      const moderated = query.get('moderated')
      const ended = query.get('ended')
      const filter = {
         ended,
         moderated,
      }

      return filter
   }

   //  console.log('1 render -> change location / 2 render -> filter / 3 render -> call -> loading / 4 render -> dispatch')

   return (
      <Cabinet>
         <div className='cabinet-page__group'>
            <CabinetTitle title={'Мои мероприятия'}>
               <Button to={getURL.cabinetEventsAdd()} link>
                  <AddSvg />
                  <span>Добавить</span>
               </Button>
            </CabinetTitle>

            <CabinetTotal total={getTotal(total, 'events')}>
               {/* TODO CABINET NAV */}
               {/* <CabinetNav></CabinetNav> */}
            </CabinetTotal>

            <CardsLoaderWrapper Loader={EventCabinetLoader} isLoading={fetchEventsRequest.isLoading} length={events.length} isLastPage={isLastPage}>
               {(loader) => {
                  return (
                     <div className='cabinet-page__items'>
                        {events.map((props) => (
                           <EventsCardCabinet key={props.id} {...props} />
                        ))}
                        {loader}
                     </div>
                  )
               }}
            </CardsLoaderWrapper>
         </div>
      </Cabinet>
   )
}

export default CabinetEvents
