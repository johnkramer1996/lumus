import { Cabinet } from 'components'
import { useDispatch } from 'hooks'
import React from 'react'

const CabinetComments = () => {
   const { setContent } = useDispatch()
   const onClick = (index) => {
      setContent({
         title: 'Модерация комментария',
         component: (
            <>
               <div class='modal-comment__info'>
                  <div class='modal-comment__user'>
                     <img src='img/avatar3.jpg' alt='' />
                  </div>
                  <div class='modal-comment__info-content'>
                     <div class='modal-comment__name'>Мария Мариева{index}</div>
                     <div class='modal-comment__place'>
                        <span>в</span> Название статьи
                     </div>
                  </div>
                  <div class='modal-comment__date'>10 сен в 12:40</div>
               </div>
               <div class='modal-comment__text'>
                  <p>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Condimentum rhoncus, sed interdum tempus. Varius mattis vitae arcu, pellentesque vitae amet. Potenti gravida sed tincidunt
                     sed habitasse. Condimentum vitae mi faucibus cursus.
                  </p>
                  <p>
                     Dolor amet imperdiet diam in at dignissim ornare metus. Sed vitae morbi nunc cursus. Velit sagittis magna proin feugiat eros, vel ut ultricies egestas. Non in ultricies dictumst
                     erat donec faucibus. Convallis leo vitae tellus quam luctus tellus faucibus?
                  </p>
               </div>
               <div class='modal-comment__buttons'>
                  <button class='modal-comment__btn modal-comment__btn--block btn btn-outline'>Забанить</button>
                  <button class='modal-comment__btn modal-comment__btn--decline btn btn-light-red'>
                     <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M13.3337 2.66602L2.66699 13.3327' stroke='#E15A5A' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                        <path d='M13.3337 13.3327L2.66699 2.66602' stroke='#E15A5A' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                     </svg>
                     <span>Отклонить</span>
                  </button>
                  <button class='modal-comment__btn modal-comment__btn--approve btn btn-blue'>
                     <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M3 8L6.33427 11.5L13 4.5' stroke='white' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                     </svg>
                     <span>Одобрить</span>
                  </button>
               </div>
            </>
         ),
      })
   }
   return (
      <Cabinet>
         <div className='comments'>
            <div className='comments__top'>
               <div className='comments__title display-3'>Комментарии</div>
               <div className='comments__num'>20 комментариев</div>
            </div>
            <div className='comments__items card-bg'>
               {Array(4)
                  .fill(0)
                  .map((item, index) => (
                     <div key={index} className='comments__item' onClick={onClick.bind(null, index)}>
                        <div className='comments__item-top'>
                           <div className='comments__item-user'>
                              <img src='img/avatar2.jpg' alt='' />
                              <span>Александр Александров</span>
                           </div>
                           <div className='comments__item-date'>10 сен в 12:40</div>
                        </div>
                        <div className='comments__item-text'>
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium placerat dignissim convallis metus, interdum ultrices placerat et, ipsum. In velit neque mauris vulputate
                           felis. Enim nibh habitasse at vestibulum sit placerat amet. Tristique sagittis vitae pellentesq..
                        </div>
                     </div>
                  ))}
            </div>
         </div>
      </Cabinet>
   )
}

export default CabinetComments
