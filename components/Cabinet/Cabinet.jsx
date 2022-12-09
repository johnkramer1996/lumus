import { CabinetSidebar } from 'components'
import React from 'react'

const Cabinet = ({ children, Sidebar = CabinetSidebar, isLoading = false }) => {
   return (
      <section className='cabinet-page'>
         <div className='container'>
            <div className='cabinet-page__inner'>
               <aside className='cabinet-page__sidebar cabinet-student__sidebar'>{<Sidebar isLoading={isLoading} />}</aside>
               <main className='cabinet-page__main dashboard'>{children}</main>
            </div>
         </div>
      </section>
   )
}

export default Cabinet
