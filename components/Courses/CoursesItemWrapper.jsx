import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { EventsCardCabinet } from 'components'
import CoursesCardSlider from './CoursesCardSlider'
import CoursesCardFront from './CoursesCardFront'
import CoursesCardCabinet from './CoursesCardCabinet'
import CoursesItemLoader from './CoursesItemLoader'

const CoursesItemWrapper = ({ items = [], amount = items.length, isLoading = false, className = '', numberComponent = 0, type = 'course', role, isToCabinet }) => {
   const ActiveComponent = useMemo(
      () =>
         ({
            // TODO REMAKE IT
            course: [CoursesCardSlider, CoursesCardFront, CoursesCardCabinet],
            events: [EventsCardCabinet, EventsCardCabinet, EventsCardCabinet],
         }[type][numberComponent]),
      [numberComponent],
   )

   return (
      <>
         {isLoading ? (
            <div className={`${className}`}>
               {Array(3)
                  .fill(0)
                  .map((_, index) => (
                     <CoursesItemLoader key={index} />
                  ))}
            </div>
         ) : items.length ? (
            <div className={`${className}`}>
               {items.slice(0, amount).map(({ ...props }) => React.createElement(ActiveComponent || EventsCardCabinet, { key: props.id, role, isToCabinet, ...props }, null))}
            </div>
         ) : (
            <div>empty</div>
         )}
      </>
   )
}

CoursesItemWrapper.propTypes = {
   items: PropTypes.array.isRequired,
}

export default CoursesItemWrapper
