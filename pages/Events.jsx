import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch, useRequest } from 'hooks'
import { ReactComponent as CalendarSvg } from 'svg/calendar.svg'
import CoursesItemLoader from 'components/Courses/CoursesItemLoader'
import { eventsSelectors, settingsSelectors } from 'store/selectors'
import { Button, CardsLoaderWrapper, EventFrontLoader } from 'components/ui'
import EventsCardFront from 'components/Events/EventsCardFront'
import { LIMIT } from 'constants'

const Events = () => {
   const { resetEvents, fetchFrontEvents } = useDispatch()
   const { setPage } = useDispatch()
   const page = useSelector(settingsSelectors.getPage)
   const { isLastPage } = useSelector(eventsSelectors.getData)
   const events = useSelector(eventsSelectors.getEvents)

   const limit = LIMIT.FRONT_EVENT
   const sortBy = 'id.desc'

   const fetchFrontEventsRequest = useRequest(fetchFrontEvents, true, { testDelay: 300 })
   useEffect(() => fetchFrontEventsRequest.call({ limit, page, sortBy }), [limit, page, sortBy])
   useEffect(() => () => resetEvents(), [])

   return (
      <section className='events'>
         <div className='container'>
            <div className='events__top'>
               <h1 className='events__title display-3'>Мероприятия</h1>
               {/* // TODO EVENT CALENDAR */}
               {/* <Button className='events__cal' outline>
                  <CalendarSvg />
                  <span>Календарь мероприятий</span>
               </Button> */}
            </div>

            <CardsLoaderWrapper Loader={EventFrontLoader} isLoading={fetchFrontEventsRequest.isLoading} length={events.length} isLastPage={isLastPage}>
               {(loader) => {
                  return (
                     <div className='events__items'>
                        {events.map((props) => (
                           <EventsCardFront key={props.id} {...props} />
                        ))}
                        {loader}
                     </div>
                  )
               }}
            </CardsLoaderWrapper>
         </div>
      </section>
   )
}

export default Events
