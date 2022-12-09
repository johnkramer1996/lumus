import { Button, CardBg, Input } from 'components/ui'
import { useDispatch, useNavigate, useRequest } from 'hooks'
import React, { useCallback, useEffect, useImperativeHandle, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CoursesEditPrice from './CoursesEditPrice'
import { coursesSelectors } from 'store/selectors'
import { useForm } from 'react-hook-form'
import { getURL } from 'utils'
import CoursesEditBlockItem from './CoursesEditBlockItem'
import CoursesEditArrayFields from 'components/CoursesEdit/CoursesEditArrayFields'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { imageFileSizeCheck, imageFormatCheck, imageMinResolutionCheck } from 'validations'

yup.addMethod(yup.mixed, 'imageMinResolutionCheck', imageMinResolutionCheck)
yup.addMethod(yup.mixed, 'imageFormatCheck', imageFormatCheck)
yup.addMethod(yup.mixed, 'imageFileSizeCheck', imageFileSizeCheck)

const validationSchema = yup.object({
   course_description: yup.string().required('Обязательное поле'),
   result_learn_text: yup.string().required('Обязательное поле'),
   descriptions: yup.array().of(
      yup.object().shape({
         name: yup.string().required('Обязательное поле'),
         text: yup.string().required('Обязательное поле'),
         imageValue: yup.string().required('Обязательное поле'),
         image: yup.mixed().imageFormatCheck().imageFileSizeCheck(1).imageMinResolutionCheck(248, 248),
      }),
   ),
   whoms: yup.array().of(
      yup.object().shape({
         name: yup.string().required('Обязательное поле'),
         text: yup.string().required('Обязательное поле'),
         imageValue: yup.string().required('Обязательное поле'),
         image: yup.mixed().imageFormatCheck().imageFileSizeCheck(1).imageMinResolutionCheck(248, 248),
      }),
   ),
   prices: yup.array().of(
      yup.object().shape({
         name: yup.string().required('Обязательное поле'),
         text: yup.string().required('Обязательное поле'),
         width: yup.string().required('Обязательное поле'),
         price_with_sale: yup.number().typeError('Некорректное число').required('Обязательное поле'),
         price: yup.number().typeError('Некорректное число').required('Обязательное поле'),
         moduls: yup.array().min(1, 'Добавьте один модуль').required('Обязательное поле'),
      }),
   ),
})

const CoursesEditTabDescription = ({ refTabs, refTab }) => {
   const { courseId } = useParams()
   const { toCabinetCourses } = useNavigate()
   const { setIsShow, setContent, editInfo, deleteInfo } = useDispatch()
   const course = useSelector(coursesSelectors.getCourse)
   const modules = useSelector(coursesSelectors.getModules)
   const descriptions = useSelector(coursesSelectors.getDescriptions)
   const prices = useSelector(coursesSelectors.getPrices)
   const whoms = useSelector(coursesSelectors.getWhoms)

   const hasDescriptions = !(Object.keys(descriptions).length === 0)
   const hasWhoms = !(Object.keys(whoms).length === 0)
   const hasPrices = !(Object.keys(prices).length === 0)
   const hasInfo = hasDescriptions || hasWhoms || hasPrices || course.description || course.result_learn_text

   const form = useForm({
      mode: 'onChange',
      defaultValues: {
         course_description: '',
         result_learn_text: '',
         descriptions: [],
         whoms: [],
         prices: [],
      },
      resolver: yupResolver(validationSchema),
   })
   const { isDirty, errors } = form.formState

   useEffect(() => {
      form.setValue(
         'descriptions',
         course.descriptions?.map(({ id, name, text, image }) => ({ id, name, text, imageValue: getURL.img(image, false) ?? '' })),
      )
      form.setValue(
         'whoms',
         course.whoms?.map(({ id, name, text, image }) => ({ id, name, text, imageValue: getURL.img(image, false) ?? '' })),
      )
      form.setValue(
         'prices',
         course.prices?.map(({ id, name, text, width, price, price_with_sale, moduls }) => ({ id, name, text, width, price, price_with_sale, moduls })),
      )
      form.setValue('course_description', course.description ?? '')
      form.setValue('result_learn_text', course.result_learn_text ? String(course.result_learn_text) : '')
   }, [course])

   const deleteInfoRequest = useRequest(deleteInfo, false, {
      success: (response, data) => {
         setIsShow(true)
         setContent({ title: 'Информация удалена', descr: '' })
      },
   })
   const editInfoRequest = useRequest(editInfo, false, {
      success: (response, data) => {
         form.reset(
            {},
            {
               keepValues: true,
            },
         )
         if (hasInfo) {
            setIsShow(true)
            setContent({ title: 'Информация о курсе обновлена', descr: '' })
            return
         }
         setIsShow(true)
         setContent({ title: 'Информация добавлена', descr: 'Ваш курс отправлен на модерацию.' })
         toCabinetCourses()
      },
   })

   const onDeleteBlock = useCallback((type, id) => id && deleteInfoRequest.call({ courseId, id, type }), [])

   const onDeleteImg = useCallback((id) => id && deleteInfoRequest.call({ courseId, id, type: 'image' }), [])

   const createField = async (id, index, body, fields, fieldName) => {
      const newId = id ? id : 'new_' + index
      const entries = Object.entries(fields).filter(([key]) => !(key === 'id' || key === 'inputFile' || key === 'inputFileValue'))
      entries.forEach(([key, value]) => {
         if (Array.isArray(value)) return value.forEach((val) => body.append(`${fieldName}[${newId}][${key}][]`, val))
         const val = typeof value === 'boolean' ? +value : value?.constructor.name === 'FileList' ? value[0] : value
         if (val === undefined || val === null) return
         body.append(`${fieldName}[${newId}][${key}]`, val)
      })
      const inputFile = fields['inputFile']
      inputFile && inputFile[0] && body.append(`${fieldName}[${newId}][${'image'}]`, inputFile[0])
   }

   const onSubmit = (data) => {
      const values = {}
      Object.entries(data).forEach(([key, value]) => {
         const val = typeof value === 'boolean' ? +value : value?.constructor.name === 'FileList' ? value[0] : value
         if (val === undefined || val === null) return
         values[key] = val
      })

      const body = new FormData()

      values.descriptions.map(async (fields, index) => await createField(fields.id, index, body, fields, 'descriptions'))
      values.whoms.map(async (fields, index) => await createField(fields.id, index, body, fields, 'whoms'))
      values.prices.map(async (fields, index) => await createField(fields.id, index, body, fields, 'prices'))

      Object.entries(form.getValues())
         .filter(([k]) => !['descriptions', 'whoms', 'prices', 'imageValue'].includes(k))
         .forEach(([key, value]) => {
            const val = typeof value === 'boolean' ? +value : value?.constructor.name === 'FileList' ? value[0] : value
            if (val === undefined || val === null) return
            body.append(key, val)
         })

      editInfoRequest.call({ courseId, body })
   }

   useImperativeHandle(refTab, () => ({
      getForm: () => form,
   }))

   return (
      <form id='form-edit' onSubmit={form.handleSubmit(onSubmit)}>
         <CardBg className='create-about'>
            <h3 className='create-about__title display-4'>О курсе</h3>
            <div className='create-about__editor'>
               <Input form={form} name='course_description' textarea />
            </div>
         </CardBg>

         <CardBg className='create-price'>
            <h3 className='create-module__title display-4'>О курсе</h3>
            <div className='create-module__items'>
               <CoursesEditArrayFields
                  name='descriptions'
                  onDelete={onDeleteBlock.bind(null, 'desc')}
                  form={form}
                  appendFields={{ name: '', text: '', imageValue: '', image: '' }}
                  btnText='Добавить описание'
               >
                  {(props) => <CoursesEditBlockItem key={props.id || props.index} {...props} onDeleteImg={onDeleteImg} />}
               </CoursesEditArrayFields>
            </div>
         </CardBg>

         <CardBg className='create-price'>
            <h3 className='create-module__title display-4'>Кому подойдет курс</h3>
            <div className='create-module__items'>
               <CoursesEditArrayFields
                  name='whoms'
                  onDelete={onDeleteBlock.bind(null, 'whom')}
                  form={form}
                  appendFields={{ name: '', text: '', imageValue: '', image: '' }}
                  btnText='Добавить описание'
               >
                  {(props) => <CoursesEditBlockItem key={props.id || props.index} {...props} onDeleteImg={onDeleteImg} />}
               </CoursesEditArrayFields>
            </div>
         </CardBg>

         <CardBg className='create-price'>
            <h3 className='create-module__title display-4'>Стоимость</h3>
            <div className='create-module__items'>
               <CoursesEditArrayFields
                  name='prices'
                  onDelete={onDeleteBlock.bind(null, 'price')}
                  form={form}
                  appendFields={{ name: '', text: '', price: '', price_with_sale: '', moduls: [] }}
                  btnText='Добавить описание'
               >
                  {(props) => <CoursesEditPrice key={props.id || props.index} {...props} />}
               </CoursesEditArrayFields>
            </div>
         </CardBg>

         <CardBg className='create-price'>
            <div className='course-edit__form-group form-group'>
               <h3 className='create-price__title display-4'>Результаты обучения</h3>
               <div className='create-about__editor'>
                  <Input form={form} name='result_learn_text' label='Результаты обучения' textarea />
               </div>
            </div>
         </CardBg>
      </form>
   )
}

export default CoursesEditTabDescription
