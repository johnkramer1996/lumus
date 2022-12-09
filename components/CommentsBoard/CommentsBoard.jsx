import React from 'react'
import CommentsBoardItem from './CommentsBoardItem'
import { ReactComponent as ArrowDownSvg } from 'svg/arrow-down.svg'
import { Button, Loader, LoaderWrapper } from 'components/ui'
import { declOfNum, getDeclOfArray } from 'utils'

const CommentsBoard = ({ isLoading, items = [], newTotal, onShowMore, isLastPage }) => {
   return (
      <div className='lessons-tab__comments'>
         <LoaderWrapper isLoading={!items.length && isLoading}>
            <>
               <div className='lessons-tab__comments-top'>
                  <div className='lessons-tab__comments-title'>{items.length ? 'Комментарии' : 'Комментарии еще не добавлены'}</div>
                  {!!items.length && (
                     <div className='lessons-tab__comments-new'>
                        {newTotal} {declOfNum(newTotal, getDeclOfArray['new'])}
                     </div>
                  )}
               </div>
               {!!items.length && (
                  <>
                     <div className='lessons-tab__comments-items'>
                        {items.map((props, index) => (
                           <CommentsBoardItem key={props.id || index} {...props} />
                        ))}
                        {isLoading && <Loader />}
                     </div>
                     {!isLastPage && (
                        <div className='lessons-tab__comments-bottom'>
                           <Button className='lessons-tab__comments-more' color='transparent' onClick={onShowMore}>
                              <ArrowDownSvg />
                              <span>Показать больше</span>
                           </Button>
                        </div>
                     )}
                  </>
               )}
            </>
         </LoaderWrapper>
      </div>
   )
}

export default CommentsBoard
