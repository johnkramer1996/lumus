import { useMemo } from 'react'
import { useDispatch, useNavigate, useRequest } from 'hooks'
import { authStepTypes } from 'store/reducers/auth/types'
import { ReactComponent as ArrowLeftSvg } from 'svg/arrow-left.svg'
import { modalsContentTypes } from 'store/reducers/modals/types'
import LoginBottom from './LoginBottom'
import LoginForm from './LoginForm'
import { batch } from 'react-redux'

const Login = ({ isModal = true }) => {
   const { toCabinet } = useNavigate()
   const { setStep, checkEmail, setBack, login, register, restore } = useDispatch()

   const checkEmailRequest = useRequest(checkEmail, false, {
      success: (response, data, prevData) => setStep(data === true ? authStepTypes.LOGIN : authStepTypes.REGISTER),
   })
   const loginRequest = useRequest(login, false, {
      success: () => toCabinet(),
      error: () => {
         setStep(modalsContentTypes.LOGIN)
         isModal && setBack(modalsContentTypes.LOGIN)
      },
   })
   const registerRequest = useRequest(register, false, {
      success: (response, data, prevData) => setStep(modalsContentTypes.LOGIN),
      error: () => isModal && setBack(modalsContentTypes.LOGIN),
   })
   const restoreRequest = useRequest(restore, false, {
      success: (response, data, prevData) => setStep(modalsContentTypes.LOGIN),
      error: () => isModal && setBack(modalsContentTypes.LOGIN),
   })

   const steps = useMemo(
      () => ({
         [authStepTypes.CHECK_EMAIL]: {
            title: 'Вход или регистрация',
            btn: 'Продолжить',
            onNext: checkEmailRequest.call,
         },
         [authStepTypes.LOGIN]: {
            title: 'Вход',
            btn: 'Войти',
            onPrev: () => setStep(authStepTypes.CHECK_EMAIL),
            onNext: loginRequest.call,
         },
         [authStepTypes.REGISTER]: {
            title: 'Регистрация',
            btn: 'Создать аккаунт',
            onPrev: () => setStep(authStepTypes.CHECK_EMAIL),
            onNext: registerRequest.call,
         },
         [authStepTypes.RESTORE]: {
            title: 'Забыли пароль',
            btn: 'Отправить',
            onPrev: () => setStep(authStepTypes.LOGIN),
            onNext: restoreRequest.call,
         },
      }),
      [],
   )

   const activeStep = '' || authStepTypes.LOGIN

   return (
      <>
         <div className='modal__top'>
            <div className='modal__title' onClick={steps[activeStep].onPrev ? steps[activeStep].onPrev : () => {}}>
               {steps[activeStep].onPrev && <ArrowLeftSvg />}
               <span>{steps[activeStep].title}</span>
            </div>
         </div>
         <div className='modal__content'>
            <LoginForm steps={steps} step={activeStep} />
            <LoginBottom />
         </div>
      </>
   )
}

export default Login
