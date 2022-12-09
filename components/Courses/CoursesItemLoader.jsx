import React from 'react'
import ContentLoader from 'react-content-loader'

const CoursesItemLoader = () => {
   return (
      <ContentLoader speed={2} width={290} height={270} viewBox='0 0 290 270' backgroundColor='#f3f3f3' foregroundColor='#ecebeb'>
         <rect x='0' y='0' rx='16' ry='16' width='290' height='180' />
         <rect x='0' y='190' rx='0' ry='0' width='290' height='10' />
         <rect x='0' y='210' rx='0' ry='0' width='290' height='10' />
         <rect x='0' y='230' rx='0' ry='0' width='290' height='10' />
      </ContentLoader>
   )
}

export default CoursesItemLoader
