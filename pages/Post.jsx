import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { postsSelectors, settingsSelectors, systemSelectors } from 'store/selectors'
import { useDispatch, useQuery, useRequest } from 'hooks'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import PostGroup from 'components/Post/PostGroup'
import { TabsNew } from 'components'
import { CardsLoaderWrapper, EventFrontLoader } from 'components/ui'
import PostCard from 'components/Post/PostCard'
import { useMemo } from 'react'

const Post = () => {
   const location = useLocation()
   const query = useQuery()
   const { resetPosts, fetchFrontPostCategories, fetchFrontPosts } = useDispatch()
   const { setPage } = useDispatch()
   const page = useSelector(settingsSelectors.getPage)
   const popularPosts = useSelector(postsSelectors.getPopularPosts)
   const recentPosts = useSelector(postsSelectors.getRecentPosts)
   const { poctCategories } = useSelector(systemSelectors.getCategories)
   const { isLastPage } = useSelector(postsSelectors.getData)

   const sort = query.getAll('sort')
   const limit = sort.length ? 3 : 3

   const fetchFrontPostsRequest = useRequest(fetchFrontPosts, true, { testDelay: 300 })

   const items = [
      { items: popularPosts, title: 'Популярные статьи', sort: 'popular', sortBy: 'views.desc' },
      { items: recentPosts, title: 'Новые статьи', sort: 'new', sortBy: 'id.desc' },
   ]

   const activeItems = items.filter((item) => !sort.length || sort.includes(item.sort))

   useEffect(() => {
      const filter = { post_category_id: query.getAll('category_id') ?? [] }
      const params = {
         filter: createSearchParams(filter).toString() || undefined,
         limit,
         page,
      }
      activeItems.forEach(({ sortBy }) => {
         fetchFrontPostsRequest.call({ ...params, sortBy })
      })
   }, [location, page])

   useEffect(() => {
      return () => {
         setPage(1)
         resetPosts()
      }
   }, [location])

   const onSetTabIndex = (index) => {
      const id = poctCategories.find((_, i) => +i === +index - 1)?.id
      const params = {
         sort,
         category_id: id ? [id] : [],
      }
      return {
         pathname: location.pathname,
         search: `?${createSearchParams(params)}`,
      }
   }

   return (
      <section className='blog'>
         <div className='container'>
            <h1 className='blog__title display-2'>Блог</h1>
            <TabsNew setIndex={onSetTabIndex}>
               {[{ name: 'Все' }, ...poctCategories].map(({ name }, index) => (
                  <div key={index} title={name}>
                     {activeItems.map(({ items, ...rest }, idx) => (
                        <PostGroup key={idx} {...rest} isShowAll={sort.includes(rest.sort)}>
                           <CardsLoaderWrapper
                              Loader={EventFrontLoader}
                              isLoading={fetchFrontPostsRequest.isLoading}
                              length={items.length}
                              setPage={setPage}
                              page={page}
                              isLastPage={!sort.includes(rest.sort) || isLastPage}
                           >
                              {(loader) => {
                                 return (
                                    <div className='blog__items'>
                                       {items.map((props) => (
                                          <PostCard key={props.id} {...props} />
                                       ))}
                                       {loader}
                                    </div>
                                 )
                              }}
                           </CardsLoaderWrapper>
                        </PostGroup>
                     ))}
                  </div>
               ))}
            </TabsNew>
         </div>
      </section>
   )
}

export default Post
