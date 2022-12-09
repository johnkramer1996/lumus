import React from 'react'
import { ReactComponent as SocialGoogleSvg } from 'svg/social-google.svg'
import { ReactComponent as SocialAppleSvg } from 'svg/social-apple.svg'
import { ReactComponent as SocialVkSvg } from 'svg/social-vk.svg'
import { ReactComponent as SocialFbSvg } from 'svg/social-fb.svg'

const CabinetSettingsSocial = () => {
   return (
      <div className='account-settings__item'>
         <div className='account-settings__item-top'>
            <span className='account-settizngs__item-title'>Социальные сети</span>
         </div>
         <div className='account-settings__item-socials'>
            <div className='account-settings__item-social account-settings__item-social--active'>
               <SocialGoogleSvg />
               <span>Отключить</span>
            </div>
            <div className='account-settings__item-social'>
               <SocialAppleSvg />
               <span>Подключить</span>
            </div>
            <div className='account-settings__item-social'>
               <SocialVkSvg />
               <span>Подключить</span>
            </div>
            <div className='account-settings__item-social'>
               <SocialFbSvg />
               <span>Подключить</span>
            </div>
         </div>
      </div>
   )
}

export default CabinetSettingsSocial
