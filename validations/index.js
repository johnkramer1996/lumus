import { loadImg } from 'utils'
import * as yup from 'yup'

export function imageDimensionCheck(message, requiredWidth, requiredHeight) {
   return this.test('imageDimensionCheck', message, async function (value) {
      const { path, createError } = this

      if (!value || !value.length) return

      const img = await loadImg(value[0])

      if (img.width !== requiredWidth) {
         return createError({
            path,
            message: `Ширина файла должна быть ${requiredWidth}px!`,
         })
      }

      if (img.height !== requiredHeight) {
         return createError({
            path,
            message: `Высота файла должна быть ${requiredHeight}px!`,
         })
      }

      return true
   })
}

export function imageMinResolutionCheck(minWidth, minHeight) {
   return this.test('imageMinSizeCheck', `Минимальное разрешение должно быть`, async function (value) {
      const { path, createError } = this
      if (value && value.length === 0) return true

      const img = await loadImg(value[0])

      if (!img) return true

      if (img.width < minWidth)
         return createError({
            path,
            message: `Минимальная ширина изображения должна быть ${minWidth}px!`,
         })

      if (img.height < minHeight) {
         return createError({
            path,
            message: `Минимальная высота изображения должна быть ${minHeight}px!`,
         })
      }

      return true
   })
}

export function imageFormatCheck() {
   return this.test('imageFormatCheck', 'Не верный формат', function (value) {
      if (!value || value.length === 0) return true
      return ['image/jpg', 'image/jpeg', 'image/png'].includes(value && value[0] && value[0].type)
   })
}

export function imageFileSizeCheck(size) {
   return this.test('imageFileSizeCheck', `Максимальный размер файла должен быть ${size} МБ`, function (value) {
      if (!value || value.length === 0) return true
      return value && value[0] && value[0].size <= size * 1000000
   })
}

export const requiredIfExist = (schema, field, errorText = 'Please enter') => (field !== undefined ? schema.required(errorText) : schema)
