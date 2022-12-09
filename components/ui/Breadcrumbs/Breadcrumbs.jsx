import React from 'react'
import { RouteNames } from 'routes'
import BreadCrumbsItem from './BreadCrumbsItem'

const Breadcrumbs = ({ items = [] }) => {
   return (
      <div className='breadcrumbs'>
         <BreadCrumbsItem to={RouteNames.HOME} title={'Главная'} />
         {items.map((props, index) => (
            <BreadCrumbsItem key={props.id || index} {...props} />
         ))}
      </div>
   )
}

export default Breadcrumbs
