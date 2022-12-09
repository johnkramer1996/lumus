import React from 'react'
import { useSelector } from 'react-redux'
import { coursesSelectors } from 'store/selectors'
import { formatBytes } from 'utils'
import { ReactComponent as DownloadSvg } from 'svg/download.svg'
import { ReactComponent as DocumentSvg } from 'svg/document.svg'
import { Button } from 'components/ui'

const CoursesLesssonFiles = () => {
   const files = useSelector(coursesSelectors.getLessonFiles)

   return (
      <div className='lesson-page__files card-bg'>
         {files.length === 0 ? (
            <div className='lesson-page__files-title display-4'>Файлы не добавлены</div>
         ) : (
            <div className='lesson-page__files-items'>
               <div className='lesson-page__files-title display-4'>Файлы</div>
               {files.map(({ id, name, file, file_size }, index) => (
                  <div key={id || index} className='lesson-page__files-item'>
                     <i className='lesson-page__files-item-icon'>
                        <DocumentSvg />
                     </i>
                     <div className='lesson-page__files-item-info'>
                        <div className='lesson-page__files-item-name'>{name}</div>
                        <div className='lesson-page__files-item-weight'>{formatBytes(file_size)}</div>
                     </div>
                  </div>
               ))}
               <Button className='lesson-page__files-btn' outline>
                  <DownloadSvg />
                  <span>Скачать все ({formatBytes(files.reduce((pr, v) => pr + +v.file_size, 0))})</span>
               </Button>
            </div>
         )}
      </div>
   )
}

export default CoursesLesssonFiles
