import React, { useEffect } from 'react'
import { Cabinet, CabinetItems } from 'components/'
import { useDispatch, useRequest } from 'hooks'
import { useSelector } from 'react-redux'
import { pagesSelectors, settingsSelectors } from 'store/selectors'
import { getTotal, getURL } from 'utils'
import { LIMIT } from 'constants'

function CabinetPages() {
   const { resetPages, fetchPages, deletePage } = useDispatch()
   const page = useSelector(settingsSelectors.getPage)
   const { total, isLastPage } = useSelector(pagesSelectors.getData)
   const items = useSelector(pagesSelectors.getPages)

   const fetchPagesRequest = useRequest(fetchPages, true, { testDelay: 300 })
   const deletePageRequest = useRequest(deletePage)

   const limit = LIMIT.CABINET_EVENT
   const sortBy = 'id.desc'

   useEffect(() => () => resetPages(), [])
   useEffect(() => fetchPagesRequest.call({ page, limit, sortBy }), [page])

   return (
      <Cabinet>
         <CabinetItems
            deleteRequest={deletePageRequest}
            toAdd={getURL.cabinetPagesAdd}
            toEdit={getURL.cabinetPagesEdit}
            items={items}
            nameId={'PageId'}
            total={getTotal(total, 'pages')}
            title={'Страницы'}
            textBtn={'Добавить страницу'}
            isLoading={fetchPagesRequest.isLoading}
            isLastPage={isLastPage}
         />
      </Cabinet>
   )
}

export default CabinetPages
