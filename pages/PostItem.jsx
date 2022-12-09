import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { postsSelectors } from 'store/selectors'
import { useDispatch, useRequest } from 'hooks'
import { Link, useParams } from 'react-router-dom'
import { PostItem as PostItemComponent } from 'components'
import PostItemComments from 'components/PostItem/PostItemComments'
import PostGroup from 'components/Post/PostGroup'
import { Breadcrumbs, CardsLoaderWrapper, EventFrontLoader } from 'components/ui'
import { getURL } from 'utils'
import PostCard from 'components/Post/PostCard'

const PostItem = () => {
   const { postId } = useParams()
   const { fetchFrontPost } = useDispatch()
   const post = useSelector(postsSelectors.getPost)
   const interested = useSelector(postsSelectors.getInterested)

   const fetchFrontPostRequest = useRequest(fetchFrontPost)

   useEffect(() => {
      fetchFrontPostRequest.call({ postId, sortBy: 'views.desc', limit: 3 })
   }, [postId])

   return (
      <section className='blog-page'>
         <div className='container'>
            <Breadcrumbs
               items={[
                  { to: getURL.posts(), title: 'Блог' },
                  { to: '', title: post.title },
               ]}
            />
            <PostItemComponent isLoading={fetchFrontPostRequest.isLoading} {...post} />

            <PostItemComments />

            <PostGroup title='Вам может быть интересно' isShowAll={false}>
               <CardsLoaderWrapper Loader={EventFrontLoader} isLoading={fetchFrontPostRequest.isLoading} length={interested.length} setPage={() => {}} page={1} isLastPage={true}>
                  {(loader) => {
                     return (
                        <div className='blog__items'>
                           {interested.map((props) => (
                              <PostCard key={props.id} {...props} />
                           ))}
                           {loader}
                        </div>
                     )
                  }}
               </CardsLoaderWrapper>
            </PostGroup>

            <PostGroup items={interested} />
         </div>
      </section>
   )
}

export default PostItem
