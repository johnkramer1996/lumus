import React from 'react'

const CabinetSupportItem = ({ name }) => {
   return (
      <div className='support__item'>
         <div className='support__item-img'>
            <img src='/assets/img/avatar2.jpg' alt='' />
         </div>
         <div className='support__item-content'>
            <div className='support__item-top'>
               <div className='support__item-name'>Олег Олегов</div>
            </div>
            <div className='support__item-text'>
               <p>Accumsan tortor augue velit est amet lobortis. Sit pretium, urna, lobortis eget vitae sit aliquet id. Enim vitae aenean est, pharetra quis volutpat etiam lorem turpis?</p>
               <p>Accumsan tortor augue velit est amet lobortis. Sit pretium, urna, lobortis eget vitae sit aliquet id. Enim vitae aenean est, pharetra quis volutpat etiam lorem turpis?</p>
            </div>
            <div className='support__item-bottom'>
               <div className='support__item-date'>10 сен 2020 в 12:10</div>
            </div>
         </div>
      </div>
   )
}

export default CabinetSupportItem
