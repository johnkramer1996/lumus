import React from 'react'

const Like = ({ color = '#74869C', fill }) => (
   <>
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
         <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M11.6568 17.5076L6.29829 20.4316C5.87045 20.653 5.34336 20.4963 5.1075 20.0774V20.0774C5.03926 19.9476 5.00245 19.8038 5 19.6573V6.70148C5 4.23056 6.69522 3.24219 9.13467 3.24219H14.8653C17.2304 3.24219 19 4.16466 19 6.53675V19.6573C19 19.8911 18.9068 20.1152 18.7408 20.2805C18.5749 20.4458 18.3498 20.5386 18.1152 20.5386C17.9655 20.5363 17.8184 20.4996 17.6852 20.4316L12.2936 17.5076C12.0949 17.4007 11.8555 17.4007 11.6568 17.5076Z'
            stroke={color}
            fill={fill ? color : ''}
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
         />
      </svg>
   </>
)

export default Like
