import { useEffect, useRef } from 'react'

const useSwiper = () => {
   const swiper = useRef()
   useEffect(() => {
      swiper.current?.swiper?.update()
   }, [])

   return [swiper]
}

export default useSwiper
