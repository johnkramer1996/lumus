import React, { useEffect } from 'react'
import { Cabinet, CabinetItemsDrag } from 'components/'
import { useDispatch, useRequest } from 'hooks'
import { useSelector } from 'react-redux'
import { settingsSelectors, subscribesSelectors } from 'store/selectors'
import * as yup from 'yup'
import { getTotal } from 'utils'
import { LIMIT } from 'constants'

const validationSchema = yup.object({
   name: yup.string().required('Please enter'),
   count: yup.number().required('Please enter'),
   price: yup.number().required('Please enter'),
})

const CabinetSubscribes = () => {
   const { resetSubscribes, setSubscribes, addSubscribe, fetchSubscribes, putSubscribe, deleteSubscribe } = useDispatch()
   const page = useSelector(settingsSelectors.getPage)
   const { total, isLastPage } = useSelector(subscribesSelectors.getData)
   const items = useSelector(subscribesSelectors.getSubscribes)

   const fetchSubscribesRequest = useRequest(fetchSubscribes, true, { testDelay: 300 })
   const addSubscribeRequest = useRequest(addSubscribe)
   const putSubscribeRequest = useRequest(putSubscribe)
   const deleteSubscribeRequest = useRequest(deleteSubscribe)

   const limit = LIMIT.CABINET_EVENT
   const sortBy = 'id.desc'

   useEffect(() => () => resetSubscribes(), [])
   useEffect(() => fetchSubscribesRequest.call({ page, limit, sortBy }), [page])

   return (
      <Cabinet>
         <CabinetItemsDrag
            items={items}
            inputs={[
               { name: 'name', label: 'Name' },
               { name: 'count', label: 'Count' },
               { name: 'price', label: 'Price' },
            ]}
            setItems={setSubscribes}
            addRequest={addSubscribeRequest}
            putRequest={putSubscribeRequest}
            deleteRequest={deleteSubscribeRequest}
            nameId={'subscribeId'}
            total={getTotal(total, 'subscribes')}
            title={'Подписки'}
            textBtn={'Добавить подписку'}
            isLoading={fetchSubscribesRequest.isLoading}
            isLastPage={isLastPage}
         />
      </Cabinet>
   )
}

export default CabinetSubscribes
