import { Button, Checkbox, Input } from 'components/ui'
import React from 'react'
import { useFieldArray } from 'react-hook-form'
import { ReactComponent as DeleteSvg } from 'svg/delete.svg'
import { ReactComponent as AddSvg } from 'svg/add.svg'
import { getError } from 'utils'

const CoursesLessonEditTestItemVariant = ({ nestIndex, form }) => {
   const { fields, remove, append } = useFieldArray({
      control: form.control,
      name: `questions.${nestIndex}.answers`,
   })
   const answers = form.getValues(`questions.${nestIndex}.answers`)

   const onAdd = async (e) => {
      e.preventDefault()
      form.clearErrors(`questions.${nestIndex}.answers`)
      append({
         ansver: 'ответ' + fields.length,
         is_true: false,
         id: null,
      })
   }

   const onRemove = async (index) => remove(index)

   const error = getError(form.formState.errors, `questions.${nestIndex}.answers`)

   return (
      <div className='lesson-test__variants'>
         <div className='lesson-test__variants-title'>Введите варианты ответов и выберите правильный</div>
         <div className='lesson-test__variants-items'>
            {fields.map((item, index) => {
               return (
                  <div key={item.id} className='lesson-test__variants-item form-group'>
                     <Checkbox form={form} name={`questions.${nestIndex}.answers.${index}.is_true`} type='radio' />
                     <Input form={form} name={`questions.${nestIndex}.answers.${index}.ansver`} placeholder='Вариант ответа' isErrorText={false} withoutWrapper />
                     <Input form={form} name={`questions.${nestIndex}.answers.${index}.id`} type='hidden' withoutWrapper />
                     <button
                        className='lesson-test__variants-delete'
                        type='button'
                        onClick={() => {
                           const id = answers[index].id
                           id && form.setValue('ansvers_to_delete', [...form.getValues('ansvers_to_delete'), id])
                           onRemove(index)
                        }}
                     >
                        <DeleteSvg />
                     </button>
                  </div>
               )
            })}
         </div>
         <Button className='lesson-test__variants-add' onClick={onAdd} outline>
            <AddSvg />
            <span>Добавить вариант</span>
         </Button>
         {error && <div className='input-error-text'>{error.message || 'Обязательное поле'}</div>}
      </div>
   )
}

export default CoursesLessonEditTestItemVariant
