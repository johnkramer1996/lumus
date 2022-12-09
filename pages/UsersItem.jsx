import React, { useEffect } from 'react'
import { Cabinet, CabinetSidebarUser, CabinetTitle, CabinetTotal, EventsCardCabinet } from 'components'
import { useParams } from 'react-router-dom'
import { useDispatch, useRequest } from 'hooks'
import { CabinetUser } from 'pages'
import { getTotal } from 'utils'
import { CardsLoaderWrapper, EventCabinetLoader } from 'components/ui'
import { useSelector } from 'react-redux'
import { authSelectors, coursesSelectors, eventsSelectors } from 'store/selectors'

const UsersItem = () => {
   const { userId, trainerId } = useParams()
   const { resetEvents, resetCourses, resetUsers, fetchFrontUser, fetchFrontTrainer } = useDispatch()
   const user = useSelector(authSelectors.getUser)
   const courses = useSelector(coursesSelectors.getCourses)
   const eventsData = useSelector(eventsSelectors.getData)
   const events = useSelector(eventsSelectors.getEvents)
   const { total } = useSelector(eventsSelectors.getData)

   const isUserPageType = !!userId

   const fetchFrontRequest = useRequest(isUserPageType ? fetchFrontUser : fetchFrontTrainer, true, { testDelay: 300 })

   useEffect(() => {
      fetchFrontRequest.call(isUserPageType ? { userId } : { trainerId })

      return () => {
         resetUsers()
         resetCourses()
         resetEvents()
      }
   }, [])

   const isLoading = fetchFrontRequest.isLoading

   return (
      <Cabinet Sidebar={CabinetSidebarUser} isLoading={isLoading}>
         <div className='cabinet-student'>
            <div className='cabinet-page__group'>
               <CabinetTitle title={'Курсы'}></CabinetTitle>
               {/* <CoursesItemWrapper items={courses} isLoading={isLoading} className={`cabinet-page__items`} numberComponent={2} role={[1]} /> */}
            </div>
            <div className='cabinet-page__group'>
               <CabinetTitle title={'Мероприятия'}></CabinetTitle>
               <CabinetTotal total={getTotal(total, 'events')}></CabinetTotal>
               <CardsLoaderWrapper Loader={EventCabinetLoader} isLoading={isLoading} length={events.length} isLastPage={eventsData.isLastPage}>
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
         </div>
      </Cabinet>
   )
}

export default UsersItem
