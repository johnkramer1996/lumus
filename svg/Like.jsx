import React from 'react'

const Like = ({ color = '#74869C', fill }) => (
   <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
         fillRule='evenodd'
         clipRule='evenodd'
         d='M11.761 20.8544C9.5904 19.5185 7.57111 17.9463 5.73929 16.1658C4.45144 14.8836 3.47101 13.3204 2.8731 11.596C1.79714 8.25091 3.05393 4.42143 6.57112 3.28812C8.41961 2.69304 10.4384 3.83167 11.9961 5.0006C13.5543 3.8331 15.5725 2.69458 17.4211 3.28812C20.9383 4.42143 22.2041 8.25091 21.1281 11.596C20.5302 13.3204 19.5498 14.8836 18.2619 16.1658C16.4301 17.9463 14.4108 19.5185 12.2402 20.8544L12.0051 21.0006L11.761 20.8544Z'
         stroke={color}
         fill={fill ? color : ''}
         strokeWidth='1.5'
         strokeLinecap='round'
         strokeLinejoin='round'
      />
   </svg>
)

export default Like
