import { COLORS } from 'constants'
import React from 'react'
import ContentLoader from 'react-content-loader'

const CourseFrontLoader = () => {
   return (
      <ContentLoader
         speed='2'
         width='290'
         height='270'
         viewBox='0 0 290 270'
         backgroundColor={COLORS.LOADER_BACKGROUND}
         foregroundColor={COLORS.LOADER_FOREGROUND}
         preserveAspectRatio='none'
         style={{ borderRadius: '16px', marginBottom: '32px', boxShadow: '0px 12px 16px -4px rgba(16, 24, 40, 0.05), 0px 4px 6px -2px rgba(16, 24, 40, 0.025)' }}
      >
         <rect x='0' y='0' rx='16' ry='16' width='290' height='180' />
         <rect x='0' y='190' rx='0' ry='0' width='290' height='10' />
         <rect x='0' y='210' rx='0' ry='0' width='290' height='10' />
         <rect x='0' y='230' rx='0' ry='0' width='290' height='10' />
      </ContentLoader>
   )
}

export default CourseFrontLoader
