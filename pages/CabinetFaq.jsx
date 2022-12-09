import React, { useEffect } from 'react'
import { Cabinet, CabinetItemsDrag } from 'components/'
import { useDispatch, useRequest } from 'hooks'
import { useSelector } from 'react-redux'
import { faqSelectors, settingsSelectors } from 'store/selectors'
import { getTotal } from 'utils'
import { LIMIT } from 'constants'

const CabinetFaq = () => {
   const { resetFaq, setFaq, addFaq, fetchFaq, putFaq, deleteFaq } = useDispatch()
   const page = useSelector(settingsSelectors.getPage)
   const { total, isLastPage } = useSelector(faqSelectors.getData)
   const items = useSelector(faqSelectors.getFaq)

   const fetchFaqRequest = useRequest(fetchFaq, true, { testDelay: 300 })
   const addFaqRequest = useRequest(addFaq)
   const putFaqRequest = useRequest(putFaq)
   const deleteFaqRequest = useRequest(deleteFaq)

   const limit = LIMIT.CABINET_EVENT
   const sortBy = 'id.desc'

   useEffect(() => () => resetFaq(), [])
   useEffect(() => fetchFaqRequest.call({ page, limit, sortBy }), [page])

   return (
      <Cabinet>
         <CabinetItemsDrag
            items={items}
            inputs={[
               { name: 'question', label: 'Вопрос' },
               { name: 'answer', label: 'Ответ', type: 'text' },
            ]}
            setItems={setFaq}
            addRequest={addFaqRequest}
            putRequest={putFaqRequest}
            deleteRequest={deleteFaqRequest}
            nameId={'faqId'}
            total={getTotal(total, 'questions')}
            title={'Вопросы'}
            textBtn={'Добавить вопрос'}
            isLoading={fetchFaqRequest.isLoading}
            isLastPage={isLastPage}
         />
      </Cabinet>
   )
}

export default CabinetFaq
