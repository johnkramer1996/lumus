const coursesSelectors = {
   getData: ({ frontCourses }) => frontCourses.data,
   getCourses: ({ frontCourses }) => frontCourses.courses,
   getCourse: ({ frontCourses }) => frontCourses.course,
   getDescriptions: ({ frontCourses }) => frontCourses.descriptions,
   getPrices: ({ frontCourses }) => frontCourses.prices,
   getTrainer: ({ frontCourses }) => frontCourses.trainer,
   getModules: ({ frontCourses }) => frontCourses.modules,
   getLessons: ({ frontCourses }) => frontCourses.lessons,
   getWhoms: ({ frontCourses }) => frontCourses.whoms,
}

export default coursesSelectors
