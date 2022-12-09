import React, { useEffect, useMemo } from 'react'
import { CoursesCardFront, Filter } from 'components/'
import { useDispatch, useRequest } from 'hooks'
import { useSelector } from 'react-redux'
import CabinetTitle from 'components/Cabinet/CabinetTitle'
import { authSelectors, coursesSelectors, settingsSelectors } from 'store/selectors'
import { createSearchParams } from 'react-router-dom'
import { CardsLoaderWrapper, CourseFrontLoader } from 'components/ui'

const Courses = () => {
   const { resetCourses, fetchFrontCourses, fetchFrontAuthCourses } = useDispatch()
   const { setPage } = useDispatch()
   const page = useSelector(settingsSelectors.getPage)
   const isAuth = useSelector(authSelectors.getIsAuth)
   const filter = useSelector(settingsSelectors.getFilter)
   const courses = useSelector(coursesSelectors.getCourses)
   const { isLastPage } = useSelector(coursesSelectors.getData)

   //  const authRequest = useRequest(isAuth ? fetchFrontAuthCourses : fetchFrontCourses, true)
   const authRequest = useRequest(fetchFrontCourses, true, { testDelay: 300 })

   useEffect(() => {
      console.log(filter)
      const newFilter = {
         category_id: filter.category,
         type_id: filter.type,
         format_id: filter.format,
         difficulty_id: filter.difficulty,
      }
      console.log('call')
      authRequest.call({ limit: 9, filter: createSearchParams(newFilter).toString() || undefined })
      // authRequest.call()
      return () => resetCourses()
   }, [filter])

   //  const filteredCourses = useMemo(
   //     () =>
   //        courses.filter(({ categoryId, typeId, difficultyId, formatId }) => {
   //           const filter1 = filter.category.length ? filter.category.find((id) => +id === +categoryId) : true
   //           const filter2 = filter.type.length ? filter.type.find((id) => +id === +typeId) : true
   //           const filter3 = filter.difficulty.length ? filter.difficulty.find((id) => +id === +difficultyId) : true
   //           const filter4 = filter.format.length ? filter.format.find((id) => +id === +formatId) : true

   //           return filter1 && filter2 && filter3 && filter4
   //        }),
   //     [filter, courses],
   //  )

   return (
      <section className='categories-page'>
         <div className='container'>
            <div className='categories-page__inner'>
               <aside className='categories-page__sidebar'>
                  <Filter />
               </aside>
               <main className='categories-page__main'>
                  <div className='courses'>
                     <CabinetTitle title={'Курсы'} hrefBtn={'/'} />

                     <CardsLoaderWrapper Loader={CourseFrontLoader} loaderLength={6} isLoading={authRequest.isLoading} length={courses.length} isLastPage={isLastPage}>
                        {(loader) => {
                           return (
                              <div className='courses__items'>
                                 {courses.map((props) => (
                                    <CoursesCardFront key={props.id} {...props} />
                                 ))}
                                 {loader}
                              </div>
                           )
                        }}
                     </CardsLoaderWrapper>
                  </div>
               </main>
            </div>
         </div>
      </section>
   )
}

export default Courses
