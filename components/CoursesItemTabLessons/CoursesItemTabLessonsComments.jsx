import CommentsBoard from 'components/CommentsBoard/CommentsBoard'
import { LIMIT } from 'constants'
import { useDispatch, useRequest } from 'hooks'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { coursesSelectors } from 'store/selectors'

const CoursesItemTabLessonsComments = () => {
   const { courseId } = useParams()
   const { resetComments, fetchComments, readComments } = useDispatch()
   const commentsData = useSelector(coursesSelectors.getCommentsData)
   const comments = useSelector(coursesSelectors.getComments)

   const { current_page, last_page, total } = commentsData.data || {}
   const { count_new } = commentsData
   const isLastPage = current_page === last_page
   const limit = LIMIT.COURSE_COMMENTS
   const [page, setPage] = useState(1)

   const fetchCommentsRequest = useRequest(fetchComments, false, {
      loading: true,
      success: ({ response, prevData, data }) => {
         const comments_id = data.filter(({ id, readed_at }) => !readed_at).map(({ id }) => id)
         comments_id.length && readCommentsRequest.call({ courseId, comments_id })
      },
   })
   const readCommentsRequest = useRequest(readComments)

   useEffect(() => fetchCommentsRequest.call({ courseId, page, _limit: limit }), [page])
   useEffect(() => () => resetComments(), [])

   const onShowMoreComments = () => {
      setPage(page + 1)
   }

   return <CommentsBoard isLoading={fetchCommentsRequest.isLoading} items={comments} newTotal={count_new} isLastPage={isLastPage} onShowMore={onShowMoreComments} />
}

export default CoursesItemTabLessonsComments
