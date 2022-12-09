import React from 'react'
import { useSelector } from 'react-redux'
import { coursesSelectors } from 'store/selectors'

const CoursesItemFeedback = () => {
   const course = useSelector(coursesSelectors.getCourse)

   return (
      <section className='course-feedback'>
         {/* <div className='container'>
                <div className='course-feedback__top'>
                    <div className='course-feedback__title display-3'>14 отзывов</div>
                    <div className='course-feedback__nav'>
                        <div className='swiper-button-prev course-feedback__prev'>
                            <svg width='12' height='20' viewBox='0 0 12 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path d='M10 18L2 10.0007L10 2' stroke='#1B2C3E' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round' />
                            </svg>
                        </div>
                        <div className='swiper-button-next course-feedback__next'>
                            <svg width='12' height='20' viewBox='0 0 12 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path d='M2 2L10 9.99934L2 18' stroke='#1B2C3E' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round' />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className='course-feedback__slider'>
                    <div className='swiper-container'>
                        <div className='swiper-wrapper'>
                            <div className='swiper-slide'>
                                <div className='course-feedback__slide'>
                                    <div className='course-feedback__slide-top'>
                                        <div className='course-feedback__user'>
                                            <img src='/assets/img/avatar.jpg' alt='' />
                                            <span>Иван Иванов</span>
                                        </div>
                                        <div className='course-feedback__date'>12 авг 2020</div>
                                    </div>
                                    <div className='course-feedback__slide-bottom'>
                                        <div className='course-feedback__text course-feedback__text--truncate'>
                                            <div className='course-feedback__text-wrap'>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet odio sit amet mauris ac ullamcorper elit. Congue risus habitant viverra
                                                    scelerisque et, in. Nulla lectus risus phasellus sapien porttitor massa, lectus quis urna. Blandit vel risus tincidunt mus ut. Nisi, dignissim etiam
                                                    porta cras turpis sodales ornare tortor amet. Vulputate vel ultricies sodales quam vel facilisi pharetra tellus adipiscing.
                                                </p>
                                                <p>
                                                    Neque viverra habitant volutpat viverra. Pulvinar fermentum fusce ullamcorper mattis tincidunt. Volutpat cursus aliquet sit lectus sociis auctor.
                                                    Morbi sed sagittis commodo, sapien, ultrices velit. Facilisis pharetra, volutpat elit vitae!
                                                </p>
                                            </div>
                                            <button className='course-feedback__text-btn'>
                                                <span className='course-feedback__text-btn-show'>Читать далее</span>
                                                <span className='course-feedback__text-btn-hidden'>Скрыть</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='swiper-slide'>
                                <div className='course-feedback__slide'>
                                    <div className='course-feedback__slide-top'>
                                        <div className='course-feedback__user'>
                                            <img src='/assets/img/avatar2.jpg' alt='' />
                                            <span>Иван Иванов</span>
                                        </div>
                                        <div className='course-feedback__date'>12 авг 2020</div>
                                    </div>
                                    <div className='course-feedback__slide-bottom'>
                                        <div className='course-feedback__video'>
                                            <iframe
                                                src='https://www.youtube.com/embed/GNrdg3PzpJQ'
                                                title='YouTube video player'
                                                frameBorder='0'
                                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='swiper-slide'>
                                <div className='course-feedback__slide'>
                                    <div className='course-feedback__slide-top'>
                                        <div className='course-feedback__user'>
                                            <img src='/assets/img/avatar2.jpg' alt='' />
                                            <span>Иван Иванов</span>
                                        </div>
                                        <div className='course-feedback__date'>12 авг 2020</div>
                                    </div>
                                    <div className='course-feedback__slide-bottom'>
                                        <div className='course-feedback__video'>
                                            <iframe
                                                width='100%'
                                                height='100%'
                                                src='https://www.youtube.com/embed/GNrdg3PzpJQ'
                                                title='YouTube video player'
                                                frameBorder='0'
                                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
      </section>
   )
}

export default CoursesItemFeedback
