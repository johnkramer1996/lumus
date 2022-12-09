import { Share } from 'components'
import { LoaderWrapper } from 'components/ui'
import React from 'react'
import { getURL } from 'utils'

const PostItem = ({ isLoading, title, image, text }) => {
   return (
      <>
         <LoaderWrapper isLoading={isLoading}>
            <h1 className='blog-page__title display-3'>{title}</h1>
            {image && (
               <div className='blog-page__img'>
                  <img src={getURL.img(image)} alt='' />
               </div>
            )}
            <div className='blog-page__wrap'>
               <div className='blog-page__left' dangerouslySetInnerHTML={{ __html: text }} />
               <div className='blog-page__right'>
                  <Share />
               </div>
            </div>
         </LoaderWrapper>
      </>
   )
}

export default PostItem
