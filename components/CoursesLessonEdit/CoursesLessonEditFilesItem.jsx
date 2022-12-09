import React from 'react'
import { ReactComponent as DeleteSvg } from 'svg/delete.svg'
import { ReactComponent as DocumentSvg } from 'svg/document.svg'
import { formatBytes } from 'utils'

const CoursesLessonEditFilesItem = ({ id, index, name, file_size, onDelete }) => {
   return (
      <>
         <div className='lesson-edit__files-item'>
            <i className='lesson-edit__files-item-icon'>
               <DocumentSvg />
            </i>
            <div className='lesson-edit__files-item-info'>
               <div className='lesson-edit__files-item-name'>{name}</div>
               <div className='lesson-edit__files-item-weight'>{formatBytes(file_size)}</div>
            </div>
            <button className='lesson-edit__files-item-delete' onClick={onDelete.bind(null, id, index)}>
               <DeleteSvg />
            </button>
         </div>
      </>
   )
}

export default CoursesLessonEditFilesItem
