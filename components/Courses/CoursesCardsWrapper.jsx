import React, { Children, useMemo } from 'react'
import PropTypes from 'prop-types'
import CoursesItemLoader from './CoursesItemLoader'

const CoursesCardsWrapper = ({ children, isLoading = false, items = [], ...props }) => {
   return (
      <>
         {isLoading ? (
            <div {...props}>
               {Array(3)
                  .fill(0)
                  .map((_, index) => (
                     <CoursesItemLoader key={index} />
                  ))}
            </div>
         ) : !items.length ? (
            <div>empty</div>
         ) : (
            <div {...props}>{children}</div>
         )}
      </>
   )
}

CoursesCardsWrapper.propTypes = {
   items: PropTypes.array.isRequired,
}

export default CoursesCardsWrapper
