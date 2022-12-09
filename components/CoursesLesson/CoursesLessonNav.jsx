import { Button } from 'components/ui'
import React from 'react'
import { getURL } from 'utils'
import { ReactComponent as EditSvg } from 'svg/edit.svg'
import { useParams } from 'react-router-dom'

const CoursesLessonNav = () => {
   const { courseId, lessonId } = useParams()

   return (
      <div className='lesson-page__nav card-bg'>
         <Button to={getURL.cabinetCoursesLessonEdit({ courseId, lessonId })} className='lesson-page__edit' outline link>
            <EditSvg />
            <span>Редактировать урок</span>
         </Button>
         <Button to={getURL.cabinetCoursesLessonTest({ courseId, lessonId })} className='lesson-page__test' link>
            Страница теста
         </Button>
      </div>
   )
}

export default CoursesLessonNav
