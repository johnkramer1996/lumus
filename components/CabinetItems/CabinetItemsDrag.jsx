import { yupResolver } from '@hookform/resolvers/yup'
import { CardBg, CardsLoaderWrapper, FaqLoader, Input } from 'components/ui'
import { useDispatch } from 'hooks'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import CoursesEditArrayFields from 'components/CoursesEdit/CoursesEditArrayFields'
import { requiredIfExist } from 'validations'
import { ReactComponent as DeleteSvg } from 'svg/delete.svg'
import { ReactComponent as DragSvg } from 'svg/drag.svg'
import { ReactComponent as LinkSvg } from 'svg/link.svg'
import { toFormData } from 'utils'
import { CabinetItemsModal, CabinetTitle, CabinetTotal } from 'components'

const validationSchema = yup
   .object({
      list: yup
         .array()
         .min(1, 'Добавьте одно поле')
         .of(yup.object().shape({ name: yup.string() }))
         .required('Обязательное поле'),
   })
   .transform(function (current, original) {
      this.fields.list.innerType.fields.name = requiredIfExist(yup.string(), original.list[0]?.name)
      return current
   })

const CabinetItemsDrag = ({
   total,
   items = [],
   inputs = [],
   nameId,
   setItems,
   addRequest,
   putRequest,
   deleteRequest,
   validationSchema: schema,
   title,
   textBtn,
   isFormData = false,
   isLoading,
   isLastPage,
}) => {
   const { setContent } = useDispatch()
   const [dragging, setDragging] = useState(false)
   const dragIndex = useRef({
      current: -1,
      end: -1,
   })

   const form = useForm({
      mode: 'onBlur',
      resolver: yupResolver(validationSchema),
      defaultValues: {
         list: [],
      },
   })

   useEffect(() => {
      form.setValue('list', [])
      items.forEach((item, index) => form.setValue(`list.${index}`, item))
   }, [items])

   const handleDragStart = (e, index) => {
      dragIndex.current.current = index
      e.target.addEventListener('dragend', handleDragEnd)
      setTimeout(() => {
         setDragging(true)
      })
   }

   const handleDragEnter = (e, index) => {
      if (index !== dragIndex.current.current) {
         const newList = [...form.getValues().list]
         const dragItem = newList.splice(dragIndex.current.current, 1)[0]
         newList.splice(index, 0, dragItem)
         dragIndex.current.end = index

         const oldOrderNumber = newList[dragIndex.current.current].orderNumber
         const newOrderNumber = newList[dragIndex.current.end].orderNumber
         if (oldOrderNumber && newOrderNumber) {
            newList[dragIndex.current.current].orderNumber = newOrderNumber
            newList[dragIndex.current.end].orderNumber = oldOrderNumber
            putRequest.call({ [nameId]: newList[dragIndex.current.current].id, body: { orderNumber: newOrderNumber } })
            putRequest.call({ [nameId]: newList[dragIndex.current.end].id, body: { orderNumber: oldOrderNumber } })
         }
         dragIndex.current.current = index
         form.setValue('list', newList)
         setItems(newList)
      }
   }

   const handleDragEnd = (e) => {
      e.preventDefault()
      e.target.removeEventListener('dragend', handleDragEnd)
      setDragging(false)
      // setItems(form.getValues().list)
      dragIndex.current.current = -1
      dragIndex.current.end = -1
   }

   const handleMouseEnter = (e) => (e.currentTarget.parentElement.parentElement.draggable = true)
   const handleMouseLeave = (e) => (e.currentTarget.parentElement.parentElement.draggable = false)

   const onRemove = (id) => deleteRequest.call({ [nameId]: id })

   const onChange = (id, body) => putRequest.call({ [nameId]: id, body: isFormData ? toFormData(body) : body })

   const onEdit = (values) => setContent({ component: <CabinetItemsModal values={values} items={items} onChange={onChange} inputs={inputs} validationSchema={schema} /> })

   const handleChange = async (key, value) => {
      //TODO RETURN IF DONT CHANGE
      // if (value === user[key]) return
      if (!(await form.trigger(key))) return
      const [arrayName, index, name] = key.split('.')
      const id = form.getValues()[arrayName][index].id
      const body = { [name]: value }
      id ? putRequest.call({ [nameId]: id, body }) : addRequest.call({ body: isFormData ? toFormData(body) : body })
   }

   const getStyles = (item) => {
      if (dragIndex.current && dragIndex.current.current === item.index) {
         return 'create-module__item form-group create-module__item--current'
      }
      return 'create-module__item form-group'
   }

   return (
      <>
         <CabinetTitle title={title}></CabinetTitle>
         <CabinetTotal total={total}></CabinetTotal>

         <CardsLoaderWrapper Loader={FaqLoader} length={items.length} loaderLength={1} isLoading={isLoading} isLastPage={isLastPage}>
            {(loader) => {
               return (
                  <>
                     <CoursesEditArrayFields name='list' loader={loader} onDelete={onRemove} form={form} appendFields={{ question: '' }} textBtn={textBtn}>
                        {({ id, index, onRemove, name, form, values = {} }) => {
                           return (
                              <CardBg
                                 key={values.id || id}
                                 className={dragging ? getStyles({ index }) : 'create-module__item form-group'}
                                 onDragStart={(e) => handleDragStart(e, index)}
                                 onDragEnter={(e) => handleDragEnter(e, index)}
                              >
                                 <div className='create-module__input'>
                                    <button className='create-module__drag' onMouseEnter={values.id ? handleMouseEnter : null} onMouseLeave={values.id ? handleMouseLeave : null}>
                                       <DragSvg />
                                    </button>
                                    <button className='create-module__link' onClick={() => onEdit(values)}>
                                       <LinkSvg />
                                    </button>
                                    <Input
                                       form={form}
                                       name={`${name}.${index}.${inputs[0].name}`}
                                       onBlur={handleChange}
                                       tabIndex={index + 1}
                                       placeholder={inputs[0].label}
                                       isErrorText={false}
                                       withoutWrapper
                                    />
                                    <Input form={form} name={`${name}.${index}.id`} type='hidden' />
                                    <button className='create-module__delete' onClick={(e) => onRemove(e, index)}>
                                       <DeleteSvg />
                                    </button>
                                 </div>
                              </CardBg>
                           )
                        }}
                     </CoursesEditArrayFields>
                  </>
               )
            }}
         </CardsLoaderWrapper>

         {items.map((item) => (
            <div key={item.id}>{item.orderNumber}</div>
         ))}
      </>
   )
}

export default CabinetItemsDrag
