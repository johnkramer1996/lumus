import React from 'react'

const SwiperControls = ({ prefix }) => {
    return (
        <>
            <div className={`swiper-pagination ${prefix}__pag`}></div>
            <div className={`swiper-button-prev ${prefix}__prev btn`}>
                <svg width='12' height='20' viewBox='0 0 12 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M10 18L2 10.0007L10 2' stroke='#1B2C3E' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round' />
                </svg>
            </div>
            <div className={`swiper-button-next ${prefix}__next btn`}>
                <svg width='12' height='20' viewBox='0 0 12 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M2 2L10 9.99934L2 18' stroke='#1B2C3E' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round' />
                </svg>
            </div>
        </>
    )
}

export default SwiperControls
