import React, { useEffect } from 'react'
import { FaqContacts, FaqCard } from 'components/'
import { useDispatch, useRequest } from 'hooks'
import { useSelector } from 'react-redux'
import { faqSelectors } from 'store/selectors'
import { CardsLoaderWrapper, FaqLoader } from 'components/ui'

const Faq = () => {
   const { resetFaq, fetchFrontFaq } = useDispatch()
   const faq = useSelector(faqSelectors.getFaq)

   const fetchFrontFaqRequest = useRequest(fetchFrontFaq, true, { testDelay: 300 })

   useEffect(() => {
      fetchFrontFaqRequest.call()
      return () => resetFaq()
   }, [])

   return (
      <section className='faq'>
         <div className='container'>
            <div className='faq__inner'>
               <div className='faq__left'>
                  <h1 className='faq__title'>Часто задаваемые вопросы</h1>
                  <CardsLoaderWrapper Loader={FaqLoader} isLoading={fetchFrontFaqRequest.isLoading} length={faq.length} isLastPage={true}>
                     {(loader) => {
                        return (
                           <div className='faq__items'>
                              {faq.map((props) => (
                                 <FaqCard key={props.id} {...props} />
                              ))}
                              {loader}
                           </div>
                        )
                     }}
                  </CardsLoaderWrapper>
               </div>
               <aside className='faq__right'>
                  <FaqContacts />
               </aside>
            </div>
         </div>
      </section>
   )
}

export default Faq
