import { Button } from 'components/ui'
import React from 'react'
import { useSelector } from 'react-redux'
import { modalsSelectors } from 'store/selectors'

const ModalDefault = ({ onContinue }) => {
   const { title, desc, button, callback, component } = useSelector(modalsSelectors.getContent)

   return (
      <>
         <div className='modal__title display-3'>{title}</div>
         {desc && <div className='modal__desc'>{desc}</div>}
         {button && (
            <Button className='modal__next' onClick={callback ?? onContinue}>
               {button ?? 'Продолжить'}
            </Button>
         )}
         {component && typeof component === 'object' && component}
      </>
   )
}

export default ModalDefault
