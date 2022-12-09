import { CabinetNav, CabinetTitle, CabinetTotal, EventsCardCabinet } from 'components'
import { Button, CardsLoaderWrapper, EventCabinetLoader } from 'components/ui'
import { useDispatch } from 'hooks'
import React from 'react'
import { useSelector } from 'react-redux'
import { coursesSelectors, eventsSelectors, settingsSelectors } from 'store/selectors'
import { getTotal, getURL } from 'utils'
import { ReactComponent as AddSvg } from 'svg/add-sm.svg'

// TODO DELETED
const CabinetUser = ({ isLoading }) => {
   const courses = useSelector(coursesSelectors.getCourses)
   const eventsData = useSelector(eventsSelectors.getData)
   const events = useSelector(eventsSelectors.getEvents)
   const { total } = useSelector(eventsSelectors.getData)

   return (
      <div className='cabinet-student'>
         <div className='cabinet-page__group'>
            <CabinetTitle title={'Курсы'} isVisibleBtn={false} total={courses.length} />
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
   )
}

export default CabinetUser
