import { Button } from 'components/ui'
import { useQuery } from 'hooks'
import React from 'react'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'

const PostGroup = ({ children, title, isShowAll, sort }) => {
   const navigate = useNavigate()
   const location = useLocation()
   const query = useQuery()

   const onSort = (sort) => {
      const category_id = query.getAll('category_id') ?? []
      const params = {
         sort: sort ? [sort] : [],
         category_id,
      }
      navigate(
         {
            pathname: location.pathname,
            search: `?${createSearchParams(params)}`,
         },
         {
            state: {
               ...location.state,
            },
         },
      )
   }

   return (
      <div className='blog__group'>
         <div className='blog__group-top'>
            <h2 className='blog__title display-3'>{title}</h2>
            {isShowAll ? (
               <Button onClick={onSort.bind(null, null)} className='blog__all' outline>
                  Вернуться
               </Button>
            ) : (
               <Button onClick={onSort.bind(null, sort)} className='blog__all' outline>
                  Показать все
               </Button>
            )}
         </div>
         {children}
      </div>
   )
}

export default PostGroup
