import React from 'react'
import { useDispatch } from 'hooks'
import { useSelector } from 'react-redux'
import { declOfNum, getDeclOfArray, isActiveClass } from 'utils'
import { ReactComponent as TypeShowColSvg } from 'svg/type-show-col.svg'
import { ReactComponent as TypeShowRowSvg } from 'svg/type-show-row.svg'
import { settingsSelectors } from 'store/selectors'

const CabinetNav = () => {
   const { setTypeShow } = useDispatch()
   const typeShow = useSelector(settingsSelectors.getTypeShow)

   return (
      <div className='cabinet-page__nav-wrap'>
         <button className={`cabinet-page__nav-item cabinet-page__nav-item--col${isActiveClass(typeShow === 'col', 'cabinet-page__nav-item--active')}`} onClick={() => setTypeShow('col')}>
            <TypeShowColSvg />
         </button>
         <button className={`cabinet-page__nav-item cabinet-page__nav-item--col${isActiveClass(typeShow === 'row', 'cabinet-page__nav-item--active')}`} onClick={() => setTypeShow('row')}>
            <TypeShowRowSvg />
         </button>
      </div>
   )
}

export default CabinetNav
