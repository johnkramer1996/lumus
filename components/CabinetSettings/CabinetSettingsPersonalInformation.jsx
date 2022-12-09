import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useInput } from 'hooks'
import { Input } from 'components/ui'
import { authSelectors } from 'store/selectors'
import { useForm, useWatch } from 'react-hook-form'

const CabinetSettingsPersonalInformation = ({ form, onBlur }) => {
   const watchPhone = useWatch({
      control: form.control,
      name: 'changePhone',
   })

   return (
      <div className='account-settings__group card-bg'>
         <h3 className='account-settings__subtitle display-4'>Личная информация</h3>
         <div className='account-settings__item'>
            <div className='account-settings__item-top'>
               <span className='account-settings__item-title'>Имя</span>
            </div>
            <Input form={form} onBlur={onBlur} name='firstName' className='account-settings__item-input' withoutWrapper />
         </div>
         <div className='account-settings__item'>
            <div className='account-settings__item-top'>
               <span className='account-settings__item-title'>Фамилия</span>
            </div>
            <Input form={form} onBlur={onBlur} name='lastName' className='account-settings__item-input' withoutWrapper />
         </div>
         <div className='account-settings__item'>
            <div className='account-settings__item-top'>
               <span className='account-settings__item-title'>Номер телефона</span>
               <div className='account-settings__item-btn switch'>
                  Изменить
                  <input
                     type='checkbox'
                     className='checkbox'
                     id={'changePhone'}
                     {...form.register('changePhone', {
                        onChange: () => setTimeout(() => form.setFocus('phone')),
                     })}
                  />
                  <label htmlFor={`changePhone`}></label>
               </div>
            </div>
            <Input form={form} onBlur={onBlur} name='phone' className='account-settings__item-input' disabled={!watchPhone} withoutWrapper />
         </div>
      </div>
   )
}

CabinetSettingsPersonalInformation.propTypes = {
   onBlur: PropTypes.func.isRequired,
}

export default CabinetSettingsPersonalInformation
