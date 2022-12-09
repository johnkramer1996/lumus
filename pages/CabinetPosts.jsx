import React, { useEffect } from 'react'
import { Cabinet, CabinetItems } from 'components/'
import { useDispatch, useRequest } from 'hooks'
import { useSelector } from 'react-redux'
import { postsSelectors, settingsSelectors } from 'store/selectors'
import { getTotal, getURL } from 'utils'
import { LIMIT } from 'constants'

function CabinetPosts() {
   const { resetPosts, fetchPosts, deletePost } = useDispatch()
   const page = useSelector(settingsSelectors.getPage)
   const { total, isLastPage } = useSelector(postsSelectors.getData)
   const items = useSelector(postsSelectors.getPosts)

   const fetchPostsRequest = useRequest(fetchPosts, true, { testDelay: 300 })
   const deletePostRequest = useRequest(deletePost)

   const limit = LIMIT.CABINET_EVENT
   const sortBy = 'id.desc'

   useEffect(() => () => resetPosts(), [])
   useEffect(() => fetchPostsRequest.call({ page, limit, sortBy }), [page])

   return (
      <Cabinet>
         <CabinetItems
            deleteRequest={deletePostRequest}
            toAdd={getURL.cabinetPostsAdd}
            toEdit={getURL.cabinetPostsEdit}
            items={items}
            nameId={'postId'}
            total={getTotal(total, 'posts')}
            title={'Посты'}
            textBtn={'Добавить пост'}
            isLoading={fetchPostsRequest.isLoading}
            isLastPage={isLastPage}
         />
      </Cabinet>
   )
}

export default CabinetPosts
