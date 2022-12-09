import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { frontStaticSelectors, pagesSelectors } from 'store/selectors'
import { useDispatch, useRequest } from 'hooks'
import { Link, useParams } from 'react-router-dom'
import { PostItem as PostItemComponent } from 'components'

const PagesItem = () => {
   const { pageId } = useParams()
   const { fetchFrontPage } = useDispatch()
   const page = useSelector(pagesSelectors.getPage)

   const fetchFrontPageRequest = useRequest(fetchFrontPage)

   useEffect(() => {
      fetchFrontPageRequest.call({ pageId })
   }, [pageId])

   return (
      <section className='blog-page'>
         <div className='container'>
            <div className='breadcrumbs'>
               <Link to='/' className='breadcrumbs__item'>
                  Главная
               </Link>
               <span className='breadcrumbs__item'>{page.title}</span>
            </div>
            <PostItemComponent isLoading={fetchFrontPageRequest.isLoading} {...page} />
         </div>
      </section>
   )
}

export default PagesItem
