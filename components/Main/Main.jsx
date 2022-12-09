import React from 'react'
import { Button } from 'components/ui/'
import { getURL } from 'utils'

const Main = ({ title, descr, img }) => {
   return (
      <section className='main'>
         <div className='container'>
            <div className='main__inner'>
               <div className='main-circle'></div>
               <div className='main-circle-mask'></div>
               <div className='main__left'>
                  <h1 className='main__title display-1'>{title}</h1>
                  <div className='main__desc'>{descr}</div>
                  <div className='main__buttons'>
                     <Button className='main__btn' to={getURL.courses()} link>
                        Найти курс для себя
                     </Button>
                     <Button className='main__btn' onClick={() => {}} outline>
                        Какой курс выбрать?
                     </Button>
                  </div>
               </div>
               <div className='main__img'>
                  <img src={img} alt='' />
               </div>
            </div>
         </div>
      </section>
   )
}

export default Main
