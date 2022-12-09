import { ROLES } from 'constants'
import { useQuery } from 'hooks'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { cabinetLinks, RouteNames } from 'routes'
import { authSelectors, settingsSelectors, systemSelectors } from 'store/selectors'
import { hasAccess } from 'utils'
import CabinetSidebarItem from './CabinetSidebarItem'

const CabinetSidebar = () => {
   const location = useLocation()
   const role = useSelector(authSelectors.getRole)
   const filter = useSelector(settingsSelectors.getFilter)

   return (
      <>
         <div className='sidebar'>
            {cabinetLinks
               .filter((item) => !item.hasAccess || hasAccess(role, item.hasAccess))
               .map((link, index) => ({
                  ...link,
                  list: link.list?.filter((item) => hasAccess(role, item.hasAccess)),
               }))
               .map((props, index) => (
                  <CabinetSidebarItem key={index} {...props} index={index} filter={filter} search={location.search} />
               ))}
         </div>
      </>
   )
}

export default React.memo(CabinetSidebar)
