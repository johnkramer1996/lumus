import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Button, ImgUploadNew, Input } from 'components/ui'
import { getDate, getURL } from 'utils'
import { useDispatch } from 'hooks'
import { authSelectors } from 'store/selectors'
import { ReactComponent as SocialGoogleSvg } from 'svg/social-google.svg'
import { ReactComponent as SocialAppleSvg } from 'svg/social-apple.svg'
import { ReactComponent as SocialVkSvg } from 'svg/social-vk.svg'
import { ReactComponent as SocialFbSvg } from 'svg/social-fb.svg'
import { ReactComponent as LogoutSvg } from 'svg/logout.svg'
import { useWatch } from 'react-hook-form'
import CabinetSettingsSocial from './CabinetSettingsSocial'

const CabinetSettingsAccount = ({ form, onBlur }) => {
   const { logout } = useDispatch()
   const user = useSelector(authSelectors.getUser)

   const watchEmail = useWatch({
      control: form.control,
      name: 'changeEmail',
   })

   const watchPassword = useWatch({
      control: form.control,
      name: 'changePassword',
   })

   return (
      <div className='account-settings__group card-bg'>
         <h3 className='account-settings__subtitle display-4'>Аккаунт</h3>
         <div className='account-settings__photo'>
            <div className='account-settings__photo-title'>Фото</div>
            <ImgUploadNew
               form={form}
               name='avatar'
               onChange={onBlur}
               onDelete={onBlur}
               hasDeleteButton={!!user.avatar}
               title={false}
               desc={false}
               view={{ radius: true, ratio: '9:9', size: 'sm', margin: true }}
            />
            <div className='account-settings__photo-wrap'></div>
         </div>

         <div className='account-settings__item'>
            <div className='account-settings__item-top'>
               <span className='account-settings__item-title'>E-mail</span>
               <label className='account-settings__item-btn switch'>
                  Изменить
                  <input
                     type='checkbox'
                     className='checkbox'
                     id={'changeEmail'}
                     {...form.register('changeEmail', {
                        onChange: () => setTimeout(() => form.setFocus('email')),
                     })}
                  />
                  <label htmlFor={`changeEmail`}></label>
               </label>
            </div>
            <Input form={form} onBlur={onBlur} name='email' className='account-settings__item-input' disabled={!watchEmail} withoutWrapper />
         </div>
         <div className='account-settings__item'>
            <div className='account-settings__item-top'>
               <span className='account-settings__item-title'>Пароль</span>
               <div className='account-settings__item-btn switch'>
                  Изменить
                  <input
                     type='checkbox'
                     className='checkbox'
                     id={'changePassword'}
                     {...form.register('changePassword', {
                        onChange: () => setTimeout(() => form.setFocus('password')),
                     })}
                  />
                  <label htmlFor={`changePassword`}></label>
               </div>
            </div>
            <Input form={form} onBlur={onBlur} name='password' type='password' className='account-settings__item-input' disabled={!watchPassword} withoutWrapper />
         </div>
         <div className='account-settings__item' style={{ marginTop: 0 }}>
            <div className='account-settings__item-top'>
               <span className='account-settings__item-title'>Подтвердите пароль</span>
            </div>
            <Input form={form} onBlur={onBlur} name='confirmationPassword' type='password' className='account-settings__item-input' disabled={!watchPassword} withoutWrapper />
         </div>
         <CabinetSettingsSocial />
         <div className='account-settings__item'>
            <div className='account-settings__item-top'>
               <span className='account-settings__item-title'>Отпуск от</span>
            </div>
            <Input form={form} onBlur={onBlur} name='vacationStart' className='account-settings__item-input' withoutWrapper datepicker />
         </div>
         <div className='account-settings__item'>
            <div className='account-settings__item-top'>
               <span className='account-settings__item-title'>Отпуск до</span>
            </div>
            <Input form={form} onBlur={onBlur} name='vacationEnd' className='account-settings__item-input' withoutWrapper datepicker />
         </div>
         <div className='account-settings__item'>
            <div className='account-settings__item-top'>
               <span className='account-settings__item-title'>Дата регистрации</span>
            </div>
            <Input form={form} onBlur={onBlur} name='createdAt' className='account-settings__item-input' withoutWrapper disabled />
         </div>
         <button className='account-settings__logout btn btn-light-red' onClick={logout}>
            <LogoutSvg />
            <span>Выйти из аккаунта</span>
         </button>
      </div>
   )
}

CabinetSettingsAccount.propTypes = {
   //  onBlur: PropTypes.func.isRequired,
   //  onChange: PropTypes.func.isRequired,
   //  onDelete: PropTypes.func.isRequired,
}

export default CabinetSettingsAccount
