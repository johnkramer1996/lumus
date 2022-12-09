import { Comments } from 'components'
import { LIMIT } from 'constants'
import { useDispatch, useInput, useRequest } from 'hooks'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { commentsSelectors } from 'store/selectors'

const PostItemComments = () => {
   const { postId } = useParams()
   const { fetchFrontPostComments, addFrontPostComment } = useDispatch()
   const { resetComments } = useDispatch()
   const { currentPage, lastPage, isLastPage, total } = useSelector(commentsSelectors.getCommentsData)
   const comments = useSelector(commentsSelectors.getComments)

   const canComment = true
   const limit = LIMIT.LESSON_COMMENTS
   const [page, setPage] = useState(1)
   const valueLastPage = useRef()

   const fetchFrontPostCommentsRequest = useRequest(fetchFrontPostComments)
   //  const readCommentsRequest = useRequest(readComments)
   const addFrontPostCommentRequest = useRequest(addFrontPostComment)

   useEffect(() => {
      console.log('update comment', postId, page, valueLastPage.current)
      // if (valueLastPage.current === page) return
      valueLastPage.current = page
      fetchFrontPostCommentsRequest.call({ postId, page, limit })
   }, [postId, page])

   useEffect(() => resetComments(), [postId])
   useEffect(() => () => resetComments(), [])

   const onAddHandle = (parentId, text) => {
      addFrontPostCommentRequest.call({ postId, parentId, text })
   }

   return (
      <>
         {canComment && (
            <Comments isLoading={fetchFrontPostCommentsRequest.isLoading} items={comments} limit={limit} total={total} isLastPage={isLastPage} onAddHandle={onAddHandle} setPage={setPage} />
         )}
      </>
   )
}

export default PostItemComments
