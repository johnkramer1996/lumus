import React from 'react'
import { getFullName, getURL } from 'utils'
import { ReactComponent as CommentsSvg } from 'svg/comments.svg'
import { Link } from 'react-router-dom'

const PostCard = ({ id, image, title, description, category = {}, user, commentsCount, views }) => {
   return (
      <Link to={getURL.postItem({ postId: id })} className='blog__item'>
         <div className='blog-card'>
            <div className='blog-card__img img img--cover'>
               <img src={getURL.img(image)} alt='' />
            </div>
            <div className='blog-card__content'>
               <div className='blog-card__category'>
                  {id}
                  {category.name}
               </div>
               <div className='blog-card__title'>{title}</div>
               <div className='blog-card__desc'>{description}</div>
               <div className='blog-card__bottom'>
                  <div className='blog-card__name'>
                     <img src='/assets/img/avatar5.jpg' alt='' />
                     <span>{getFullName(user || {})}</span>
                  </div>
                  <div> просмотров {views}</div>
                  <div className='blog-card__comments'>
                     <CommentsSvg />
                     <span>{commentsCount}</span>
                  </div>
               </div>
            </div>
         </div>
      </Link>
   )
}

export default PostCard
