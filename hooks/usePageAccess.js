import { useEffect } from 'react'

const usePageAccess = (user_id, page_user_id, to, isLoading) => {
   useEffect(() => page_user_id && !isLoading && !(user_id === page_user_id) && to(), [isLoading])
}

export default usePageAccess
