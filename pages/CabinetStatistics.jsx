import { CabinetStatisticsTab1, CabinetStatisticsTab2, CabinetStatisticsTab3, Tabs } from 'components'
import React, { useMemo, useState } from 'react'

const CabinetStatistics = () => {
   const tabItems = useMemo(
      () => [
         { title: 'Отчет по тренеру', component: <CabinetStatisticsTab1 /> },
         { title: 'Выплаты', component: <CabinetStatisticsTab2 /> },
         { title: 'Транзакции', component: <CabinetStatisticsTab3 /> },
      ],
      [],
   )

   return (
      <>
         <div className='course-report'>
            <h1 className='course-report__title display-3'>Отчет по тренеру</h1>
            <Tabs items={tabItems} classPrefix='course-report' />
         </div>
      </>
   )
}

export default CabinetStatistics
