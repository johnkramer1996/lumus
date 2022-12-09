import React from 'react'
import FooterTop from './FooterTop'
import FooterBottom from './FooterBottom'

const Footer = React.memo(() => {
   return (
      <footer className='footer'>
         <FooterTop />
         <FooterBottom />
      </footer>
   )
})

export default Footer
