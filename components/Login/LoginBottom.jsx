import { useDispatch } from 'hooks'
import React from 'react'
import { useSelector } from 'react-redux'
import { authStepTypes } from 'store/reducers/auth/types'
import { Link } from 'react-router-dom'
import { ReactComponent as SocialGoogleSvg } from 'svg/social-google.svg'
import { ReactComponent as SocialAppleSvg } from 'svg/social-apple.svg'
import { ReactComponent as SocialVkSvg } from 'svg/social-vk.svg'
import { ReactComponent as SocialFBSvg } from 'svg/social-fb.svg'
import { authSelectors } from 'store/selectors'

const LoginBottom = () => {
   const { setStep } = useDispatch()
   const step = useSelector(authSelectors.getStep)

   return (
      <>
         {step === authStepTypes.CHECK_EMAIL && (
            <>
               <div className='modal__or'>Или</div>
               <div className='modal__socials'>
                  <Link to={'/'} className='modal__socials-item'>
                     <SocialGoogleSvg />
                  </Link>
                  <Link to={'/'} className='modal__socials-item'>
                     <SocialAppleSvg />
                  </Link>
                  <Link to={'/'} className='modal__socials-item'>
                     <SocialVkSvg />
                  </Link>
                  <Link to={'/'} className='modal__socials-item'>
                     <SocialFBSvg />
                  </Link>
               </div>
            </>
         )}
         {step === authStepTypes.LOGIN && (
            <>
               <button className='modal__forgot btn' onClick={() => setStep(authStepTypes.RESTORE)}>
                  Забыли пароль?
               </button>
            </>
         )}
         {step === authStepTypes.REGISTER && (
            <>
               <div className='modal__hint'>
                  Нажимая на «Создать аккаунт», вы соглашаетесь с <Link to='/'>Политикой обработки данных</Link>
               </div>
            </>
         )}
      </>
   )
}

export default LoginBottom
