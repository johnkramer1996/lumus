const coursesSelectors = {
   getData: ({ courses }) => courses.data,
   getCourses: ({ courses }) => courses.courses,
   getCourse: ({ courses }) => courses.course,
   getModules: ({ courses }) => courses.modules,
   getInfo: ({ courses }) => courses.info,
   getDescriptions: ({ courses }) => courses.descriptions,
   getPrices: ({ courses }) => courses.prices,
   getWhoms: ({ courses }) => courses.whoms,
   getLessons: ({ courses }) => courses.lessons,
   getLesson: ({ courses }) => courses.lesson,
   getLessonQuestionsData: ({ courses }) => courses.lessonQuestionsData,
   getLessonQuestions: ({ courses }) => courses.lessonQuestions,
   getLessonAnswers: ({ courses }) => courses.lessonAnswers,
   getLessonFiles: ({ courses }) => courses.lessonFiles,
   getInterestes: ({ courses }) => courses.interestes,
   getTrainer: ({ courses }) => courses.trainer,

   // TODO OWN STATE
   getCommentsData: ({ courses }) => courses.commentsData,
   getComments: ({ courses }) => courses.comments,
}

export default coursesSelectors
