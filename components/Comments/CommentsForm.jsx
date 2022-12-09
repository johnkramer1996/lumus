import { Button, Input } from 'components/ui'
import React from 'react'
import { useSelector } from 'react-redux'
import { authSelectors } from 'store/selectors'
import { getURL } from 'utils'

const CommentsForm = ({ onAdd, form, avatar }) => {
   const role = useSelector(authSelectors.getRole)

   return (
      <div className='blog-comments__top'>
         <div className='blog-comments__avatar'>
            <img src={getURL.avatar(avatar, role)} alt='' />
         </div>
         <Input form={form} name='comment' placeholder='Написать комментарий или задать вопрос...' withoutWrapper textarea />
         <Button onClick={onAdd}>Отправить</Button>
      </div>
   )
}

export default CommentsForm
