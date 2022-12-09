import React from 'react'
import ContentLoader from 'react-content-loader'

const CabinetSidebarLoader = () => {
   return (
      <ContentLoader speed={2} width={290} height={310} viewBox='0 0 290 310' backgroundColor='#f3f3f3' foregroundColor='#ecebeb'>
         <circle cx='50%' cy='64' r='48' />
         <rect x='0' y='130' rx='0' ry='0' width='290' height='20' />
         {/* <rect x='0' y='0' rx='16' ry='16' width='290' height='180' /> */}
         <rect x='0' y='170' rx='0' ry='0' width='290' height='20' />
         <rect x='0' y='210' rx='0' ry='0' width='290' height='20' />
         <rect x='0' y='250' rx='0' ry='0' width='290' height='20' />
         <rect x='0' y='290' rx='0' ry='0' width='290' height='20' />
      </ContentLoader>
   )
}

export default CabinetSidebarLoader
