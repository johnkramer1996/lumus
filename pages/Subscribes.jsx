import React, { useEffect } from 'react'
import { SubscribesCard } from 'components'
import { useDispatch, useRequest } from 'hooks'
import { useSelector } from 'react-redux'
import { subscribesSelectors } from 'store/selectors'

const Subscribe = () => {
   const { resetSubscribes, fetchFrontSubscribes } = useDispatch()
   const subscribes = useSelector(subscribesSelectors.getSubscribes)

   const fetchFrontSubscribesRequest = useRequest(fetchFrontSubscribes)

   useEffect(() => fetchFrontSubscribesRequest.call(), [])
   useEffect(() => resetSubscribes(), [])

   return (
      <section className='sub'>
         <div className='container'>
            <h1 className='sub__title display-2'>Подписка на Люмос</h1>
            <div className='sub__desc'>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit sapiente illo repellat, blanditiis perspiciatis quas, odit aspernatur sequi dicta aut vel omnis vero cumque quos quidem.
               Eius unde ipsam vitae?
            </div>
            <div className='sub__items'>
               {subscribes.map(({ id, ...props }) => (
                  <SubscribesCard key={id} {...props} />
               ))}
            </div>
         </div>
      </section>
   )
}

export default Subscribe
