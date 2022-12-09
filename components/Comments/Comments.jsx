import { Input, Loader, LoaderWrapper } from 'components/ui'
import { useDispatch } from 'hooks'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { authSelectors } from 'store/selectors'
import { ReactComponent as ArrowDownSvg } from 'svg/edit.svg'
import { declOfNum, getDeclOfArray, getURL } from 'utils'
import CommentsForm from './CommentsForm'
import CommentsItem from './CommentsItem'

const Comments = ({ isLoading, items = [], total = 0, isLastPage = true, limit = 4, onAddHandle, setPage }) => {
   const user = useSelector(authSelectors.getUser)
   const { avatar } = user
   const countShowAdd = items.length + limit < total ? limit : total - items.length

   const form = useForm()

   const onAdd = (parentId, e) => {
      e.preventDefault()

      const text = form.getValues('comment')
      if (!text || text.length < 5) return

      onAddHandle(parentId, text)
      form.setValue('comment', '')
      return true
   }

   const onShowMore = () => setPage((p) => p + 1)

   const arr = {}
   for (let i = 0; i < items.length; i++) {
      arr[items[i].parentId || 0] = arr[items[i].parentId || 0] ? arr[items[i].parentId || 0] : []
      arr[items[i].parentId || 0].push(items[i])
   }

   function my_sort(data, parent = 0) {
      return data[parent]?.reduce((prev, val) => (prev.push({ ...val, childs: my_sort(data, val.id) }), prev), []) || []
   }

   const newArr = my_sort(arr)

   return (
      <div className='blog-comments'>
         <h2 className='blog-comments__title'>
            {total ? (
               <>
                  {total} {declOfNum(total, getDeclOfArray['comments'])}
               </>
            ) : (
               'Комментарии еще не добавлены'
            )}
         </h2>
         <div className='blog-comments__inner'>
            <CommentsForm form={form} onAdd={onAdd.bind(null, null)} avatar={avatar} />

            <div className='blog-comments__group'>
               <div className='blog-comments__main'>
                  {[...newArr].map((props, index) => {
                     return <CommentsItem key={props.id || index} {...props} form={form} onAdd={onAdd} />
                  })}
               </div>
               {isLoading && <Loader />}

               {!isLastPage && (
                  <div className='blog-comments__sub'>
                     <button className='blog-comments__more' onClick={onShowMore}>
                        <ArrowDownSvg />
                        <span>
                           Показать еще {countShowAdd} {declOfNum(countShowAdd, getDeclOfArray['comments'])}
                        </span>
                     </button>
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}

export default React.memo(Comments)
