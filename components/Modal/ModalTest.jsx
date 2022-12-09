import { Button } from 'components/ui'
import React from 'react'
import { useSelector } from 'react-redux'
import { modalsSelectors } from 'store/selectors'

const ModalTest = () => {
   const content = useSelector(modalsSelectors.getContent)
   const { result } = content

   return (
      <>
         <div class='modal-result__title display-3'>Поздравляем!</div>
         <div class='modal-result__desc'>Ваш результат:</div>
         <div class='modal-result__progress'>
            <svg class='modal-result__progress-grey' viewBox='0 0 35 35' xmlns='http://www.w3.org/2000/svg'>
               <circle class='donut_background_three' stroke='#D2D2D2' stroke-width='2' fill='none' stroke-linecap='round' stroke-dasharray='100,100' cx='17.5' cy='17.5' r='15.91549431' />
            </svg>
            <svg class='modal-result__progress-blue' viewBox='0 0 35 35' xmlns='http://www.w3.org/2000/svg'>
               <circle id='blue' class='donut_background_three' stroke='#FFBA55' stroke-width='2' fill='none' stroke-linecap='round' stroke-dasharray='75,100' cx='17.5' cy='17.5' r='15.91549431' />
               {/* <style type="text/css">
										#blue{stroke:url(#MyGradient)}
								</style> */}
               <defs>
                  <linearGradient id='MyGradient'>
                     <stop offset='15%' stop-color='#5E61DA' />
                     <stop offset='85%' stop-color='#8C52D6' />
                  </linearGradient>
               </defs>
            </svg>
            <div class='modal-result__num'>
               <span>{result.percent}%</span>
            </div>
         </div>
         <Button className='modal-result__next'>Следующий урок</Button>
         <Button className='modal-result__reopen' outline>
            Пройти тест заново
         </Button>
      </>
   )
}

export default ModalTest
