import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch, useRequest } from 'hooks'
import { authSelectors, coursesSelectors, systemSelectors } from 'store/selectors'
import { CoursesDetail, CoursesSlider, Main } from 'components'

const Home = () => {
   const { resetCourses, fetchFrontCourses, fetchFrontAuthCourses } = useDispatch()
   const isAuth = useSelector(authSelectors.getIsAuth)
   const courses = useSelector(coursesSelectors.getCourses)
   const { categories } = useSelector(systemSelectors.getCategories)

   const fetchFrontCourseRequest = useRequest(isAuth ? fetchFrontAuthCourses : fetchFrontCourses, true)

   useEffect(() => {
      fetchFrontCourseRequest.call()
      return () => resetCourses()
   }, [])

   console.log('render')

   const items = categories.map((item) => ({ ...item, items: courses.filter(({ category_id }) => category_id === item.id) }))

   return (
      <>
         <Main
            title={'Обучение без ограничений'}
            descr={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa id sem sem vitae, ac in vulputate enim elementum.'}
            img={'/assets/img/art.svg'}
         />

         <CoursesSlider className={'course-slider1'} title={'Популярные курсы'} items={items} />

         <CoursesDetail
            items={[
               {
                  id: 1,
                  img: 'assets/img/course4.jpg',
                  title: 'Название курса',
                  descr: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa id sem sem vitae, ac in vulputate enim elementum.',
                  btn: 'Пройти пробный урок',
                  stock: '-35%',
                  date: 'до 16 сентября',
                  price: '4 800 грн.',
                  priceOld: '6 000 грн.',
               },
               {
                  id: 2,
                  img: 'assets/img/course4.jpg',
                  title: 'Название курса',
                  descr: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa id sem sem vitae, ac in vulputate enim elementum.',
                  btn: 'Пройти пробный урок',
                  stock: '-35%',
                  date: 'до 16 сентября',
                  price: '4 800 грн.',
                  priceOld: '6 000 грн.',
               },
            ]}
         />

         <CoursesSlider className={'course-slider2'} title={'Новые курсы'} items={[items[0]]} />
      </>
   )
}

export default Home
