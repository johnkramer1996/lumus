import React from 'react'
import { coursesSelectors } from 'store/selectors'
import { useSelector } from 'react-redux'
import CoursesEditBlock from './CoursesEditBlock'

const CoursesEditDescription = (props) => {
   const descriptions = useSelector(coursesSelectors.getDescriptions)

   return <CoursesEditBlock {...props} array={descriptions} />
}

export default CoursesEditDescription
