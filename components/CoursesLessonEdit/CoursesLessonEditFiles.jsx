import { useDispatch, useRequest } from 'hooks'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { coursesSelectors } from 'store/selectors'
import { declOfNum, getDeclOfArray } from 'utils'
import CoursesLessonEditFilesItem from './CoursesLessonEditFilesItem'

const CoursesLessonEditFiles = () => {
   const { courseId, lessonId } = useParams()
   const { uploadFile, deleteFile, setLessonFiles, setIsShow, setContent } = useDispatch()
   const files = useSelector(coursesSelectors.getLessonFiles) || []
   // TODO USE INPUT IFLE
   //  const inputFile = useInputFile()

   const uploadFileRequest = useRequest(uploadFile)
   const deleteFileRequest = useRequest(deleteFile)

   const onChange = (e) => {
      // inputFile.onChange()
      const body = new FormData()
      body.append('file', e.target.files[0])
      uploadFileRequest.call({ courseId, lessonId, body })
   }
   const onDelete = (id, index) => {
      setLessonFiles(files.filter((_, i) => i !== index))
      id && deleteFileRequest.call({ courseId, lessonId, body: { id } })
   }

   return (
      <>
         <div className='lesson-edit__files-top'>
            <h3 className='lesson-edit__files-title display-4'>Файлы</h3>
            <div className='lesson-edit__files-num'>
               {files.length} {declOfNum(files.length, getDeclOfArray['files'])}
            </div>
         </div>
         <div className='lesson-edit__files-items'>
            {files.map((props, index) => (
               <CoursesLessonEditFilesItem key={props.id || props.hidden_id || index} {...props} index={index} onDelete={onDelete} />
            ))}
         </div>
         <div className='lesson-edit__files-upload'>
            <div className='lesson-edit__files-upload-title'>
               <strong>Загрузите файл</strong>
               <span>или перетащите его сюда</span>
            </div>
            <div className='lesson-edit__files-upload-hint'>до 10 MБ</div>
            {/* <input ref={inputFile.ref} className='lesson-edit__files-upload-input' type='file' onChange={onChange.bind(null)} /> */}
         </div>
      </>
   )
}

export default CoursesLessonEditFiles
