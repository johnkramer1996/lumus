import React, { useEffect } from 'react'
import { CabinetNav, CabinetTitle, CabinetTotal, Edit } from 'components/'
import * as yup from 'yup'
import { Button, CardBg, CardsLoaderWrapper, FaqLoader } from 'components/ui'
import { ReactComponent as DeleteSvg } from 'svg/delete.svg'
import { ReactComponent as LinkSvg } from 'svg/link.svg'
import { Link } from 'react-router-dom'
import { isFunction } from 'utils'

const CabinetItems = ({ deleteRequest, toAdd, toEdit, items = [], nameId, total, title, textBtn, isLoading, isLastPage }) => {
   return (
      <>
         <CabinetTitle title={title}>
            <Button to={isFunction(toAdd) ? toAdd() : ''} outline link>
               <span>{textBtn}</span>
            </Button>
         </CabinetTitle>

         <CabinetTotal total={total}></CabinetTotal>

         <CardsLoaderWrapper Loader={FaqLoader} length={items.length} isLoading={isLoading} isLastPage={isLastPage}>
            {(loader) => {
               return (
                  <div className='cabinet-page__items'>
                     {items.map(({ id, name, description }) => {
                        return (
                           <CardBg key={id} className='cabinet-page__items-item'>
                              <div className='cabinet-page__items-buttons'>
                                 <Link to={isFunction(toAdd) ? toEdit({ [nameId]: id }) : ''}>
                                    <LinkSvg />
                                 </Link>
                                 <button onClick={(e) => deleteRequest.call({ [nameId]: id })}>
                                    <DeleteSvg />
                                 </button>
                              </div>
                              <h3 className='cabinet-page__items-title'>{name}</h3>
                              <p className='cabinet-page__items-descr'>{description}</p>
                           </CardBg>
                        )
                     })}
                     {loader}
                  </div>
               )
            }}
         </CardsLoaderWrapper>
      </>
   )
}

export default CabinetItems
