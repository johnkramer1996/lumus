import React from 'react'
import ContentLoader from 'react-content-loader'

const EventsCardLoader = () => {
   return (
      <ContentLoader speed={2} width={290} height={360} viewBox='0 0 290 360' backgroundColor='#d4dbe7' foregroundColor='#ecebeb'>
         <rect x='0' y='0' rx='16' ry='16' width='290' height='290' />
         <rect x='0' y='300' rx='0' ry='0' width='290' height='10' />
         <rect x='0' y='320' rx='0' ry='0' width='290' height='10' />
         <rect x='0' y='340' rx='0' ry='0' width='290' height='10' />
      </ContentLoader>
   )
}

export default EventsCardLoader
