import React, { useEffect } from 'react'
import { CabinetItemsDrag } from 'components/'
import { useDispatch, useRequest } from 'hooks'
import { useSelector } from 'react-redux'
import { postsSelectors } from 'store/selectors'
import { getTotal } from 'utils'

const CabinetPosts = () => {
   const { resetPosts, setPosts, addPost, fetchPosts, putPost, deletePost } = useDispatch()
   const { total } = useSelector(postsSelectors.getData)
   const items = useSelector(postsSelectors.getPosts)

   const fetchPostsRequest = useRequest(fetchPosts, true)
   const addPostRequest = useRequest(addPost)
   const putPostRequest = useRequest(putPost)
   const deletePostRequest = useRequest(deletePost)

   useEffect(() => {
      fetchPostsRequest.call()
      return () => resetPosts()
   }, [])

   console.log(total)

   return (
      <CabinetItemsDrag
         total={getTotal(total, 'posts')}
         nameId={'postId'}
         items={items}
         setItems={setPosts}
         resetItems={resetPosts}
         addRequest={addPostRequest}
         putRequest={putPostRequest}
         deleteRequest={deletePostRequest}
         inputs={[
            { name: 'name', label: 'Название' },
            { name: 'title', label: 'Заголовок' },
            { name: 'text', label: 'Описание' },
            { name: 'image', label: 'Изображение' },
            { name: 'description', label: 'description' },
         ]}
         title={'Посты'}
         textBtn={'Добавить пост'}
      />
   )
}

export default CabinetPosts
