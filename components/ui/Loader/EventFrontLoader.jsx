import { COLORS } from 'constants'
import React from 'react'
import ContentLoader from 'react-content-loader'

const EventFrontLoader = () => {
   return (
      <ContentLoader
         speed='2'
         width='100%'
         height='305'
         viewBox='0 0 100 305'
         backgroundColor={COLORS.LOADER_BACKGROUND}
         foregroundColor={COLORS.LOADER_FOREGROUND}
         preserveAspectRatio='none'
         style={{ borderRadius: '16px', marginBottom: '32px', boxShadow: '0px 12px 16px -4px rgba(16, 24, 40, 0.05), 0px 4px 6px -2px rgba(16, 24, 40, 0.025)' }}
      >
         <rect x='0' y='0' rx='0' ry='0' width='100%' height='100%' />
      </ContentLoader>
   )
}

export default EventFrontLoader
