import { Loader, LoaderWrapper } from 'components/ui'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { isFunction } from 'utils'

const Tabs = ({ children, items = [], isLoading = false, classPrefix = 'course-report', isAvaibleIndex, setIndex, activeTabIndex }, ref) => {
   const location = useLocation()
   const navigate = useNavigate()
   const { activeIndexStep = 0 } = location.state || {}

   useEffect(() => {
      activeTabIndex && changeStep(activeTabIndex)
   }, [])

   const events = {
      setItemsByIndex: (index) => changeStep(index, isFunction(setIndex) && setIndex(index)),
      nextItems: () => events.setItemsByIndex(activeIndexStep + 1 >= items.length ? 0 : activeIndexStep + 1),
      changeTab: (index) => !(isFunction(isAvaibleIndex) && !isAvaibleIndex(index, activeIndexStep)) && events.setItemsByIndex(index),
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

   const Component = (items[activeIndexStep] || items[0]).component

   if (!items.length) return ''

   return (
      <>
         <div className={`${classPrefix}__nav`}>
            <div className={`${classPrefix}__tabs`}>
               {items.map(({ title, notifications }, index) => (
                  <div
                     key={index}
                     className={`${classPrefix}__tab${activeIndexStep === index ? ` ${classPrefix}__tab--active` : ''} ${classPrefix}__tab${notifications ? ` ${classPrefix}__tab--notification` : ''}`}
                     onClick={() => events.changeTab(index)}
                  >
                     {title}
                     <i>{notifications ? notifications : ''}</i>
                  </div>
               ))}
            </div>
         </div>
         <LoaderWrapper isLoading={isLoading}>
            <div className={`${classPrefix}__content ${classPrefix}__content--active`}>
               {isFunction(children) ? children({ activeIndexStep, refTabs: ref }) : children ? children : typeof Component === 'object' ? Component : <Component {...items[activeIndexStep].props} />}
            </div>
         </LoaderWrapper>
      </>
   )
}

export default forwardRef(Tabs)
