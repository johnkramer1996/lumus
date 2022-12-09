import React from 'react'
import { Button } from 'components/ui'
import { useDispatch } from 'hooks'
import { useFieldArray } from 'react-hook-form'
import { ReactComponent as AddSvg } from 'svg/add.svg'

const CoursesEditArrayFields = ({ children, loader, form, onDelete, appendFields, name = '', textBtn = '' }) => {
   const { setContent, setIsShow } = useDispatch()
   const { fields, append, remove } = useFieldArray({
      control: form.control,
      name,
   })
   const values = form.getValues(name)

   const handleAdd = async (e) => {
      e.preventDefault()
      append(appendFields)
   }

   const onRemove = (e, index) => {
      e.preventDefault()
      values[index].id
         ? setContent({
              title: 'Вы точно хотите удалить',
              callback: () => {
                 onDelete(values[index].id)
                 remove(index)
                 setIsShow(false)
              },
           })
         : remove(index)
   }

   return (
      <>
         <div className='create-module__items'>
            {fields.map((props, index) => children({ ...props, index, onRemove, name, form, values: values[index] }))}
            {loader}
         </div>
         <Button className='create-module__add' onClick={handleAdd} outline>
            <AddSvg />
            <span>{textBtn}</span>
         </Button>
         {form.formState.errors[name] && <div className='input-error-text'>{form.formState.errors[name].message}</div>}
      </>
   )
}

export default CoursesEditArrayFields
