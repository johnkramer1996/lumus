import { useDispatch } from 'hooks'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { modalsContentTypes } from 'store/reducers/modals/types'
import Login from '../Login/Login'
import ModalTest from './ModalTest'
import { ReactComponent as CloseSvg } from 'svg/close.svg'
import { modalsSelectors } from 'store/selectors'
import { isActiveClass } from 'utils'
import ModalDefault from './ModalDefault'

const Modal = () => {
   const { setIsShow, setType, setBack } = useDispatch()
   const back = useSelector(modalsSelectors.getBack)
   const isShow = useSelector(modalsSelectors.getIsShow)
   const type = useSelector(modalsSelectors.getType)

   const onContinue = useCallback(() => {
      if (!back) return setIsShow(false)
      setType(back)
      setBack('')
   }, [back])

   const ActiveModal = {
      [modalsContentTypes.DEFAULT]: ModalDefault,
      [modalsContentTypes.LOGIN]: Login,
      [modalsContentTypes.TEST]: ModalTest,
   }

   return (
      <div className={`modal${isActiveClass(isShow, 'modal--show')}`} style={{ textAlign: 'center' }}>
         <div className='modal__bg' onClick={onContinue}></div>
         <div className='modal-dialog'>
            <div className='modal__content'>
               <button className='modal__close' onClick={onContinue}>
                  <CloseSvg />
               </button>
               {React.createElement(ActiveModal[type] || ActiveModal[modalsContentTypes.DEFAULT], { onContinue }, null)}
            </div>
         </div>
      </div>
   )
}

export default Modal
