import React from 'react'
import Login from 'components/Login/Login'

const LoginPage = () => {
   return (
      <section className='categories-page'>
         <div className='container'>
            <div className='modal-wrapper'>
               <div className='modal'>
                  <div className='modal-dialog'>
                     <div className='modal__content'>
                        <Login isModal={false} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default LoginPage
