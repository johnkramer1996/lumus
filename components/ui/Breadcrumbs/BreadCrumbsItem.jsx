import React from 'react'
import { Link } from 'react-router-dom'

const BreadCrumbsItem = ({ to, title }) => {
   return to ? (
      <Link to={to} className='breadcrumbs__item'>
         {title}
      </Link>
   ) : (
      <span className='breadcrumbs__item'>{title}</span>
   )
}

export default BreadCrumbsItem
