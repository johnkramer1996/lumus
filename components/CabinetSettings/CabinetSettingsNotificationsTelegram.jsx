import React from 'react'
import { ReactComponent as TelegramSvg } from 'svg/telegram.svg'

const CabinetSettingsNotificationsTelegram = () => {
   return (
      <div className='account-settings__item'>
         <span className='account-settings__item-title'>Социальные сети</span>
         <span className='account-settings__item-desc'>Подключите Telegram к своему аккаунту, чтобы получать уведомления от бота в мессенджере</span>
         <div className='account-settings__item-socials'>
            <div className='account-settings__item-social account-settings__item-social--active1'>
               <TelegramSvg />
               <span>Отключить</span>
            </div>
         </div>
      </div>
   )
}

export default CabinetSettingsNotificationsTelegram
