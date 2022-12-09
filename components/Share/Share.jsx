import React from 'react'
import { ReactComponent as SocialVkSvg } from 'svg/social-vk.svg'
import { ReactComponent as SocialFbSvg } from 'svg/social-fb.svg'
import { ReactComponent as SocialTwitterSvg } from 'svg/social-twitter.svg'
import { ReactComponent as SocialYoutubeSvg } from 'svg/social-youtube.svg'

const Share = () => {
   return (
      <div className='blog-page__share'>
         <div className='blog-page__share-title'>Поделиться</div>
         <div className='blog-page__share-items'>
            <a href='/' className='blog-page__share-item' target='_blank'>
               <SocialFbSvg />
            </a>
            <a href='/' className='blog-page__share-item' target='_blank'>
               <SocialTwitterSvg />
            </a>
            <a href='/' className='blog-page__share-item' target='_blank'>
               <SocialYoutubeSvg />
            </a>
         </div>
      </div>
   )
}

export default Share
