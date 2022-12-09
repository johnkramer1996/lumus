import { Button, LoaderEmpty } from 'components/ui'
import { useDispatch } from 'hooks'
import React from 'react'
import { useSelector } from 'react-redux'
import { settingsSelectors } from 'store/selectors'

const CardsLoaderWrapper = ({ children, Loader, loaderLength = 3, isLoading, length, isLastPage }) => {
   const { setPage } = useDispatch()
   const page = useSelector(settingsSelectors.getPage)

   return (
      <>
         {length || isLoading ? (
            <>
               {children(
                  isLoading &&
                     Array(loaderLength)
                        .fill(0)
                        .map((_, index) => <Loader key={index} />),
               )}
               {!isLoading && isLastPage === false && (
                  <div className='btn-wrapper'>
                     <Button onClick={() => setPage(page + 1)} outline>
                        Показать больше
                     </Button>
                  </div>
               )}
            </>
         ) : (
            !isLoading && <LoaderEmpty />
         )}
         {}
      </>
   )
}

export default CardsLoaderWrapper
