import { Input } from 'components/ui'
import React, { useState } from 'react'
import { getDate, getFullName, getURL } from 'utils'
import CommentsForm from './CommentsForm'

const CommentsItem = ({ id, text, user, updated_at, childs, form, onAdd }) => {
   const { avatar } = user || {}

   const [isShow, setIsShow] = useState(false)

   const onAddWrapper = (parentId, e) => {
      e.preventDefault()
      if (onAdd(parentId, e)) setIsShow(false)
   }

   return (
      <>
         <div className='blog-comments__item'>
            <div className='blog-comments__avatar'>
               <img src={getURL.avatar(avatar)} alt='' />
            </div>
            <div className='blog-comments__item-content'>
               <div className='blog-comments__item-top'>
                  <div className='blog-comments__item-name'>
                     {id}
                     {getFullName(user)}
                  </div>
               </div>
               <div className='blog-comments__item-text'>{text}</div>
               <div className='blog-comments__item-bottom'>
                  <div className='blog-comments__item-date'>{getDate(updated_at)}</div>
                  <button className='blog-comments__item-btn' onClick={() => setIsShow((s) => !s)}>
                     Ответить
                  </button>
               </div>
            </div>
         </div>
         <div className='blog-comments__sub'>{isShow && <CommentsForm form={form} onAdd={onAddWrapper.bind(null, id)} avatar={avatar} />}</div>
         {!!childs?.length && (
            <div className='blog-comments__sub'>
               {childs.map((props, index) => {
                  return <CommentsItem key={props.id || index} {...props} form={form} onAdd={onAdd} />
               })}
            </div>
         )}
      </>
   )
}

export default CommentsItem
