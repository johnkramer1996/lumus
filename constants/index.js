export const ROLES = {
   USER: 1,
   TRAINER: 2,
   EMPLOYEE: 3,
   ADMIN: 4,
}

export const THEME_COLORS = {
   ACCENT: '#5e61da',
}

export const COLORS = {
   LOADER_BACKGROUND: '#eeeefd',
   LOADER_FOREGROUND: '#f0f8ff',
}

export const COOKIES = {
   AUTH: 'lumus',
}

export const LIMIT = {
   FRONT_EVENT: 3,
   CABINET_EVENT: 3,
   LESSON_COMMENTS: 5,
   COURSE_COMMENTS: 5,
}

export const TIME_NAMES = [
   { id: 'minutes', name: 'Минута' },
   { id: 'hours', name: 'Час' },
   { id: 'days', name: 'День' },
   { id: 'weeks', name: 'Неделя' },
   { id: 'month', name: 'Месяц' },
   { id: 'years', name: 'Год' },
]

export const TIME_NAMES_OBJ = TIME_NAMES.reduce((p, v) => ((p[v.id] = v.name), p), {})
