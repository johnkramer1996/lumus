import React from 'react'
import { Link } from 'react-router-dom'
import { declOfNum, getDate, getDeclOfArray, getTime, getURL } from 'utils'

const EventsCardCabinet = ({ id, image, edate, etime, name, allUsers = 0, newUsers = 0 }) => {
   return (
      <Link to={getURL.eventsItem({ eventId: id })} className='event-card2'>
         <div className='event-card2__img img img--md img--cover'>
            <img src={getURL.img(image)} alt='' />
         </div>
         <div className='event-card2__content'>
            <div className='event-card2__time'>
               <span className='event-card2__time-day'>{getDate(edate)}</span>
               <span className='event-card2__time-hour'>{getTime(etime)}</span>
            </div>
            <h3 className='event-card2__title'>{name}</h3>
            {!!allUsers && (
               <div className='event-card2__bottom'>
                  <div className='event-card2__students'>
                     <div className='event-card2__students-title'>
                        {allUsers} {declOfNum(allUsers, getDeclOfArray['users'])}
                     </div>
                     <div className='event-card2__students-new'>{newUsers} новых</div>
                  </div>
               </div>
            )}
         </div>
      </Link>
   )
}

export default EventsCardCabinet
