import React from 'react'
import { Link } from 'react-router-dom'
import { RouteNames } from 'routes'
import { addZerro, getTime, getURL, namesMonth } from 'utils'

const EventsCardFront = ({ id, name, description, image, edate = '', etime = '', allUsers = 0, newUsers = 0 }) => {
   const date = new Date(edate)

   return (
      <div className='events__item'>
         <Link to={getURL.eventsItem({ eventId: id })} className='event-card'>
            <div className='event-card__left'>
               <div className='event-card__day'>{date.getDate()}</div>
               <div className='event-card__month'>{namesMonth[date.getMonth()]}</div>
               <div className='event-card__year'>{date.getFullYear()}</div>
               <div className='event-card__time'>в {getTime(etime)}</div>
            </div>
            <div className='event-card__img img img--cover'>
               <img src={getURL.img(image)} alt='' />
            </div>
            <div className='event-card__right'>
               <h3 className='event-card__title'>{name}</h3>
               <div className='event-card__desc'>{description}</div>
               <ul>
                  <li> allUsers {allUsers}</li>
                  <li>newUsers {newUsers}</li>
               </ul>
            </div>
         </Link>
      </div>
   )
}

export default EventsCardFront
