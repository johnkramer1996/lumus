import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { patternNumbers, toBoolean, validateEmail, validateName, validatePassword, validatePhone } from 'utils'

const useInput = ({ initialValue = '', name, is, required = true } = {}) => {
   const [value, setValue] = useState(initialValue)
   const [error, setError] = useState('')
   const prevValueRef = useRef(initialValue)
   const propertyRef = useRef()
   const inputRef = useRef()

   const { isDisabled, isCheckbox, isNumbers, isPassword } = is || {}

   const onChange = useCallback((e) => {
      console.log(e.target)
      let newValue = !isCheckbox ? e.target.value : e.target.checked
      if (isNumbers) newValue = patternNumbers(newValue)
      // if (isTime) newValue = patternTime(newValue)

      if (prevValueRef.current !== value) {
         setValue(newValue)
         return true
      }
   }, [])
   const onFocus = useCallback((e) => {
      propertyRef.current.update()
      prevValueRef.current = !isCheckbox ? e.target.value : e.target.checked
   }, [])
   const onBlur = useCallback((e) => {
      check(e.target.value)
      isDisabled && inputRef.current.setAttribute('disabled', isDisabled)
   }, [])
   const onDisabledRemove = useCallback(() => {
      inputRef.current.removeAttribute('disabled')
      inputRef.current.focus()
      inputRef.current.value = ''
      !isPassword && setTimeout(() => (inputRef.current.value = prevValueRef.current), 0)
   }, [])
   const clear = useCallback(() => setValue(initialValue), [])
   const check = useCallback(
      (value) => {
         if (!required) return
         const newError = hasError(value)
         if (error !== newError) setError(newError)
         return !!error
      },
      [error],
   )

   const hasError = useMemo(() => checkInput.bind(null, is || {}), [])
   const update = useCallback(() => setError(''), [])
   //  const isNewValue = useCallback((val) => prevValueRef.current !== val, [])

   propertyRef.current = {
      value,
      error,
      setValue,
      update,
      clear,
      ref: inputRef,
      onDisabledRemove,
      check,
      isCheckbox,
      name,
      bind: {
         ref: inputRef,
         value,
         onChange,
         onFocus,
         onBlur,
         disabled: !!isDisabled,
         name,
      },
   }

   if (isCheckbox) propertyRef.current.bind.checked = toBoolean(value)
   if (isPassword) propertyRef.current.bind.type = 'password'

   return propertyRef.current
}
export default useInput

const checkInput = ({ isPassword, isName, isEmail }, value) => {
   if (Array.isArray(value) && !value.length) return 'Обязательное поле'
   if (value === '') return 'Обязательное поле'
   if (isPassword && !validatePassword(value)) return 'Некорректный пароль'
   if (isName && !validateName(value)) return 'Некорректное имя'
   if (isEmail && !validateEmail(value)) return 'Некорректный E-mail'
   // if (isPhone && !validatePhone(value)) return 'Некорректный телефон'
   return ''
}
