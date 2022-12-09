import React from 'react'
import { useLocation } from 'react-router-dom'
import { RouteNames } from 'routes'
import {
   CabinetContacts,
   CabinetEvents,
   CabinetFaq,
   CabinetNotifications,
   CabinetPages,
   CabinetPosts,
   CabinetSettings,
   CabinetStatistics,
   CabinetSubscribes,
   CabinetSupport,
   CabinetComments,
} from 'pages'

const Cabinet = () => {
   const location = useLocation()
   const { pathname } = location

   switch (pathname) {
      //  case RouteNames.CABINET_COURSES:
      //     return <CabinetCourses />
      case RouteNames.CABINET_CONTACTS:
         return <CabinetContacts />
      case RouteNames.CABINET_POSTS:
         return <CabinetPosts />
      case RouteNames.CABINET_PAGES:
         return <CabinetPages />
      case RouteNames.CABINET_SUBSCRIBES:
         return <CabinetSubscribes />
      case RouteNames.CABINET_FAQ:
         return <CabinetFaq />
      case RouteNames.CABINET_NOTIFICATIONS:
         return <CabinetNotifications />
      case RouteNames.CABINET_EVENTS:
         return <CabinetEvents />
      case RouteNames.CABINET_STATISTICS:
         return <CabinetStatistics />
      case RouteNames.CABINET_SUPPORT:
         return <CabinetSupport />
      case RouteNames.CABINET_COMMENTS:
         return <CabinetComments />
      case RouteNames.CABINET_SETTINGS:
         return <CabinetSettings />

      default:
         return <CabinetEvents />
   }
}

export default Cabinet
