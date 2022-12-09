import React from 'react'
import { useSelector } from 'react-redux'
import { authSelectors } from 'store/selectors'
import { getURL } from 'utils'

const CabinetGreet = () => {
   const user = useSelector(authSelectors.getUser)

   return (
      <div className='dashboard__greet card-bg'>
         <div className='dashboard__greet-img'>
            <img src={getURL.avatar(user.avatar)} alt='' />
         </div>
         <div className='dashboard__greet-content'>
            <div className='dashboard__greet-name'>Привет, {user.firstname || user.login}!</div>
            <div className='dashboard__greet-bottom'>
               <div className='dashboard__greet-balls'>
                  <i></i>
                  <span>340 баллов</span>
               </div>
               <div className='dashboard__greet-hint'>Как получать баллы?</div>
            </div>
         </div>
      </div>
   )
}

export default CabinetGreet
