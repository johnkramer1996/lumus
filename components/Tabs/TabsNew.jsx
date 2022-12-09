import { LoaderWrapper } from 'components/ui'
import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { isFunction } from 'utils'

const Tabs = ({ children, onIsAvaibleIndex, setIndex, activeTabIndex, isLoading }, ref) => {
   const location = useLocation()
   const navigate = useNavigate()
   const { activeIndexStep = 0 } = location.state || {}

   useEffect(() => {
      activeTabIndex && changeStep(activeTabIndex)
   }, [])

   const events = {
      setItemsByIndex: (index) => changeStep(index, isFunction(setIndex) && setIndex(index)),
      nextItems: () => events.setItemsByIndex(activeIndexStep + 1 >= children.length ? 0 : activeIndexStep + 1),
      changeTab: (index) => !(isFunction(onIsAvaibleIndex) && !onIsAvaibleIndex(index, activeIndexStep)) && events.setItemsByIndex(index),
      getIndex: () => activeIndexStep,
   }

   useImperativeHandle(ref, () => events)

   const changeStep = (index, newLocation = {}) => {
      navigate(
         {
            ...location,
            ...newLocation,
         },
         {
            state: {
               ...location.state,
               activeIndexStep: index,
            },
         },
      )
   }

   if (!children.length) return ''

   return (
      <>
         <div className='blog__nav'>
            <div className='blog__tabs'>
               {/* <LoaderWrapper isLoading={isLoading}> */}
               {children.map(({ props: { notifications, title } }, index) => {
                  const className = ['blog__tab']
                  activeIndexStep === index && className.push('blog__tab--active')
                  !!notifications && className.push('blog__tab--notification')
                  return (
                     <div key={index} className={className.join(' ')} onClick={() => events.changeTab(index)}>
                        {title}
                        <i>{!!notifications && notifications}</i>
                     </div>
                  )
               })}
               {/* </LoaderWrapper> */}
            </div>
         </div>
         <div className='blog__content blog__content--active'>{children[activeIndexStep]}</div>
      </>
   )
}

export default forwardRef(Tabs)
