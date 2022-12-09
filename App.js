import React, { useEffect } from 'react'
import AppRouter from './components/AppRouter'
import { Header, Footer, Modal } from 'components/'
import { useDispatch, useRequest } from 'hooks'
import { useLocation } from 'react-router-dom'
import * as yup from 'yup'

const App = () => {
   const location = useLocation()
   const { pathname } = location
   const { fetchCategoies, fetchSocUrls, fetchContacts, fetchFrontPages } = useDispatch()

   const fetchCategoiesRequest = useRequest(fetchCategoies)
   const fetchSocUrlsRequest = useRequest(fetchSocUrls)
   const fetchContactsRequest = useRequest(fetchContacts)
   const fetchFrontPagesRequest = useRequest(fetchFrontPages)

   useEffect(() => {
      fetchCategoiesRequest.call()
      fetchSocUrlsRequest.call()
      fetchContactsRequest.call()
      fetchFrontPagesRequest.call()
   }, [])

   useEffect(() => window.scrollTo(0, 0), [pathname])

   return (
      <>
         <Header />
         <AppRouter />
         <Footer />
         <Modal />
      </>
   )
}

export default App
