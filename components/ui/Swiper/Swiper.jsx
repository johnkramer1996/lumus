import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import { SwiperControls } from 'components/ui/'
import { useSwiper } from 'hooks/'

export const defaultOptions = {
   className: 'swiper-container',
   spaceBetween: 20,
   slidesPerView: 1,
   loop: true,
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },
   modules: [Navigation, Pagination],
   pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
   },
}

const SwiperSlider = ({ items = [], children, className, prefix, options, bgImg, controls = false }) => {
   const [swiper] = useSwiper()

   if (!items.length) return ''

   return (
      <>
         <Swiper ref={swiper} {...defaultOptions} {...options}>
            {items.map((props) => (
               <SwiperSlide key={props.id} className={className} style={bgImg ? { backgroundImage: `url(${props.img})` } : {}}>
                  {children(props)}
               </SwiperSlide>
            ))}
         </Swiper>
         {controls && <SwiperControls prefix={prefix} />}
      </>
   )
}

export default SwiperSlider
