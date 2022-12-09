import { Button } from 'components/ui'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { authSelectors, coursesSelectors } from 'store/selectors'
import { getURL } from 'utils'
import { ReactComponent as NextSvg } from 'svg/next.svg'

const CoursesLessonsInfo = () => {
   const { courseId } = useParams()
   const role = useSelector(authSelectors.getRole)
   const course = useSelector(coursesSelectors.getCourse)

   const { short_desc, status, currentLesson } = course

   return (
      <div className='lkp-course__card card-bg'>
         <div className='lkp-course__card-title display-4'>О курсе</div>
         <div className='lkp-course__card-status'>{status || 'Статус'}</div>
         <div className='lkp-course__card-desc'>{short_desc}</div>
         <Button to={getURL.cabinetCoursesLesson({ courseId, lessonId: currentLesson.id }, role)} className='lkp-course__card-continue' link>
            <NextSvg />
            <span>Продолжить обучение</span>
         </Button>
         <Button to={getURL.coursesItem({ courseId }, role)} className='lkp-course__card-link' outline link>
            Перейти на страницу курса
         </Button>
      </div>
   )
}

export default CoursesLessonsInfo
