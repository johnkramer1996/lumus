import { useMemo } from 'react'
import { useNavigate as useNavigateRouterDom } from 'react-router-dom'
import { RouteNames } from 'routes'
import { getURL } from 'utils'

const useDispatch = () => {
   const navigate = useNavigateRouterDom()

   return useMemo(
      () => ({
         toError: (params) => navigate(RouteNames.ERROR, params),
         toContacts: (params) => navigate(RouteNames.CONTACTS, params),
         toCourses: (params) => navigate(getURL.courses(), params),
         toCoursesItem: (arg, params) => navigate(getURL.coursesItem(arg), params),
         toEventsItem: (arg, params) => navigate(getURL.eventsItem(arg), params),
         toCabinet: (params) => navigate(getURL.cabinet(), params),
         toCabinetCourses: (params) => navigate(getURL.cabinetCourses(), params),
         toCabinetCoursesEdit: (arg, params) => navigate(getURL.cabinetCoursesEdit(arg), params),
         toCabinetCoursesAdd: (params) => navigate(getURL.cabinetCoursesAdd(), params),
         toCabinetEvents: (params) => navigate(getURL.cabinetEvents(), params),
         toCabinetEventsAdd: (params) => navigate(getURL.cabinetEventsAdd(), params),
         toCabinetEventsEdit: (arg, params) => navigate(getURL.cabinetEventsEdit(arg), params),
         toCabinetNotifications: (params) => navigate(getURL.cabinetNotifications(), params),
         toCabinetNotificationsAdd: (params) => navigate(getURL.cabinetNotificationsAdd(), params),
         toCabinetNotificationsEdit: (arg, params) => navigate(getURL.cabinetNotificationsEdit(arg), params),
         navigate,
      }),
      [],
   )
}

export default useDispatch
