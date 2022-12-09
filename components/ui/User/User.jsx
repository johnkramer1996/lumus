import { ROLES } from 'constants'
import React from 'react'
import { Link } from 'react-router-dom'
import { getFullName, getURL } from 'utils'

const User = ({ user, role = ROLES.USER }) => {
   const url = role === ROLES.USER ? getURL.usersItem({ userId: user.id }) : getURL.trainersItem({ trainerId: user.id })
   return (
      <Link to={url} className='user-sm'>
         <img src={getURL.avatar(user.avatar, role)} alt='' />
         <span>{getFullName(user)}</span>
      </Link>
   )
}

export default User
