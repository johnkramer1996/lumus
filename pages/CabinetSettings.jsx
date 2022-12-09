import React, { useEffect } from 'react'
import { useDispatch, useRequest } from 'hooks/'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSelector } from 'react-redux'
import { authSelectors } from 'store/selectors'
import { getDate, getURL } from 'utils'
import { Cabinet, CabinetSettingsAccount, CabinetSettingsDocs, CabinetSettingsNotifications, CabinetSettingsPersonalInformation, CabinetTitle } from 'components'
import { Button } from 'components/ui'

const validationSchema = yup.object({
   email: yup.string().required('Please enter your email.').email('must be a valid email address.'),
   password: yup.string().required('Please enter your password.').min(8, 'Your password is too short.'),
   confirmationPassword: yup
      .string()
      .required('Please retype your password.')
      .test('passwords-match', 'Passwords must match', function (value) {
         return this.parent.password === value
      }),
   // .oneOf([yup.ref('password')], 'Your passwords do not match.'),
})

const CabinetSettings = () => {
   const { settings, fetchUserSettings } = useDispatch()
   const user = useSelector(authSelectors.getUser)
   const docs = useSelector(authSelectors.getDocs)
   const role = useSelector(authSelectors.getRole)

   const fetchUserSettingsRequest = useRequest(fetchUserSettings)
   const settingsRequest = useRequest(settings)

   useEffect(() => {
      fetchUserSettingsRequest.call()
   }, [])

   const form = useForm({
      mode: 'onBlur',
      resolver: yupResolver(validationSchema),
      defaultValues: {
         avatar: '',
         emailChange: false,
         email: '',
         passwordChange: false,
         password: '',
         confirmationPassword: '',
         createdAt: '',
         vacationStart: '',
         vacationEnd: '',
      },
   })
   const { setValue } = form

   useEffect(() => {
      setValue('avatarView', getURL.avatar(user.avatar, role))
      setValue('email', user.email)
      setValue('password', '')
      setValue('confirmationPassword', '')
      setValue('email', user.email)
      setValue('vacationStart', user.vacationStart)
      setValue('vacationEnd', user.vacationEnd)
      setValue('createdAt', getDate(user.createdAt))

      setValue('firstName', user.firstName)
      setValue('lastName', user.lastName)
      setValue('phone', user.phone)

      setValue('Docs.FilePassport_1View', getURL.img(docs.filePassport_1))
      setValue('Docs.FilePassport_2View', getURL.img(docs.filePassport_2))
      setValue('Docs.FileDiplomView', getURL.img(docs.fileDiplom))
      setValue('Docs.FileTreatyView', getURL.img(docs.fileTreaty))
   }, [user])

   const createRequest = (array) => {
      if (!array.length) return
      const body = new FormData()

      for (const { key, value } of array) {
         if (value instanceof FileList) {
            for (var x = 0; x < value.length; x++) {
               body.append(key, value[x])
            }
         } else {
            body.append(key, value)
         }
      }
      for (const item of body.entries()) console.log(item)

      settingsRequest.call({ body })
   }

   const onBlur = async (key, value = 'delete') => {
      if (value === user[key]) return
      if (!(await form.trigger(key))) return
      const entries = [{ key, value }]
      if (key === 'password') {
         if (!form.formState.touchedFields['confirmationPassword'] || !(await form.trigger('confirmationPassword'))) return
         entries.push({ key: 'confirmationPassword', value })
      }
      if (key === 'confirmationPassword') {
         if (form.formState.errors['password']) return
         entries.push({ key: 'password', value })
      }

      if (['password', 'confirmationPassword'].includes(key)) form.setValue('changePassword', false)
      if (['email'].includes(key)) form.setValue('changeEmail', false)
      if (['phone'].includes(key)) form.setValue('changePhone', false)

      createRequest(entries)
   }

   const onChangeNovifications = (type, source, status) => {
      createRequest([
         { key: 'Notification[0].Type', value: type },
         { key: 'Notification[0].Source', value: source },
         { key: 'Notification[0].Status', value: !!status },
      ])
   }
   console.log(role)
   return (
      <Cabinet>
         <CabinetTitle title={'Настройки аккаунта'}>
            <Button to={`${getURL.trainersItem({ trainerId: user.id })}`} outline link>
               <span>Публичный профиль</span>
            </Button>
         </CabinetTitle>
         {/* <Link to={getURL.trainersItem({ trainerId: userEvent.id })} className='course-top__user'>
            <img src={getURL.avatar(userEvent.avatar, ROLES.TRAINER)} alt='' />
            <span>{getFullName(userEvent)}</span>
         </Link> */}
         <CabinetSettingsAccount form={form} onBlur={onBlur} />
         <CabinetSettingsPersonalInformation form={form} onBlur={onBlur} />
         <CabinetSettingsNotifications form={form} onChange={onChangeNovifications} />
         <CabinetSettingsDocs form={form} onChange={onBlur} />
      </Cabinet>
   )
}

export default CabinetSettings
