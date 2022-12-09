import React from 'react'
import { ReactComponent as SocialVkSvg } from 'svg/social-vk.svg'
import { ReactComponent as SocialFbSvg } from 'svg/social-fb.svg'
import { ReactComponent as SocialTwitterSvg } from 'svg/social-twitter.svg'
import { ReactComponent as SocialYoutubeSvg } from 'svg/social-youtube.svg'
import { useSelector } from 'react-redux'
import { frontStaticSelectors, systemSelectors } from 'store/selectors'

const FooterBottom = () => {
   const { phone } = useSelector(systemSelectors.getContacts)

   return (
      <section className='footer-bottom'>
         <div className='container'>
            <div className='footer-bottom__inner'>
               <div className='footer__by'>&copy; {new Date().getFullYear()} Люмос</div>
               <div className='footer__socials'>
                  <a href='/' className='footer__socials-item'>
                     <SocialFbSvg />
                  </a>
                  <a href='/' className='footer__socials-item'>
                     <SocialTwitterSvg />
                  </a>
                  <a href='/' className='footer__socials-item'>
                     <SocialVkSvg />
                  </a>
                  <a href='/' className='footer__socials-item'>
                     <SocialYoutubeSvg />
                  </a>
               </div>
               <a href={`tel:${phone}`} className='footer__phone'>
                  {phone}
               </a>
            </div>
         </div>
      </section>
   )
}

export default FooterBottom
