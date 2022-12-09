import { Comments } from 'components'
import { LIMIT } from 'constants'
import { useDispatch, useInput, useRequest } from 'hooks'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { coursesSelectors } from 'store/selectors'

const CoursesLessonComments = () => {
   const { courseId, lessonId } = useParams()
   const { fetchUserLessonComments, addComment, readComments } = useDispatch()
   const commentsData = useSelector(coursesSelectors.getCommentsData)
   const comments = useSelector(coursesSelectors.getComments)

   const { current_page, last_page, total } = commentsData || {}
   const isLastPage = current_page === last_page
   const limit = LIMIT.LESSON_COMMENTS
   const [page, setPage] = useState(1)
   const valueLastPage = useRef()

   const fetchUserLessonCommentsRequest = useRequest(fetchUserLessonComments, false, {
      loading: true,
      success: ({ response, prevData, data }) => {
         const comments_id = data.comments.data.filter(({ readed_at }) => !readed_at).map(({ id }) => id)
         comments_id.length && readCommentsRequest.call({ courseId, comments_id })
      },
   })
   const readCommentsRequest = useRequest(readComments)
   const addCommentRequest = useRequest(addComment)

   useEffect(() => {
      if (valueLastPage.current === page) return
      valueLastPage.current = page
      fetchUserLessonCommentsRequest.call({ courseId, lessonId, page, _limit: limit })
   }, [page])

   const onAddHandle = (text) => addCommentRequest.call({ courseId, lessonId, text })

   return (
      <>
         <Comments isLoading={fetchUserLessonCommentsRequest.isLoading} items={comments} limit={limit} total={total} isLastPage={isLastPage} onAddHandle={onAddHandle} setPage={setPage} />
      </>
   )
}

export default CoursesLessonComments
