import React from 'react'
import { useSelector } from 'react-redux'
import { coursesSelectors } from 'store/selectors'

const CoursesSeo = () => {
   const course = useSelector(coursesSelectors.getCourse)

   return (
      <section className='course-seo course-seo--truncate'>
         <div className='container'>
            <div className='course-seo__inner'>
               <h2 className='course-seo__title display-3'>Заголовок SEO-блока</h2>
               <div className='course-seo__desc'>
                  <p>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet odio sit amet mauris ac ullamcorper elit. Congue risus habitant viverra scelerisque et, in. Nulla lectus risus
                     phasellus sapien porttitor massa, lectus quis urna. Blandit vel risus tincidunt mus ut. Nisi, dignissim etiam porta cras turpis sodales ornare tortor amet. Vulputate vel ultricies
                     sodales quam vel facilisi pharetra tellus adipiscing.
                  </p>
                  <p>
                     Neque viverra habitant volutpat viverra. Pulvinar fermentum fusce ullamcorper mattis tincidunt. Volutpat cursus aliquet sit lectus sociis auctor. Morbi sed sagittis commodo,
                     sapien, ultrices velit. Facilisis pharetra, volutpat elit vitae! Blandit vel risus tincidunt mus ut. Nisi, dignissim etiam porta cras turpis sodales ornare tortor amet. Vulputate
                     vel ultricies sodales quam vel facilisi pharetra tellus adipiscing. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet odio sit amet mauris ac ullamcorper elit.
                     Congue risus habitant viverra scelerisque et, in. Nulla lectus risus phasellus sapien porttitor massa, lectus quis urna. Blandit vel risus tincidunt mus ut. Nisi, dignissim etiam
                     porta cras turpis sodales ornare tortor amet. Vulputate vel ultricies sodales quam vel facilisi pharetra tellus adipiscing.
                  </p>
               </div>
               <button className='course-seo__btn'>
                  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                     <path d='M19 8.5L12 15.5L5 8.5' stroke='#9FADBF' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                  </svg>
                  <span className='course-seo__btn-show'>Развернуть</span>
                  <span className='course-seo__btn-hidden'>Свернуть</span>
               </button>
            </div>
         </div>
      </section>
   )
}

export default CoursesSeo
