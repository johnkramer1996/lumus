import { Button } from 'components/ui'
import { useDispatch } from 'hooks'
import useQuery from 'hooks/useQuery'
import React, { useEffect, useMemo } from 'react'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, createSearchParams } from 'react-router-dom'
import { settingsSelectors, systemSelectors } from 'store/selectors'
import FilterItems from './FilterItems'

const Filter = () => {
   const location = useLocation()
   const query = useQuery()
   const navigate = useNavigate()
   const { resetFilter, setFilter } = useDispatch()
   const filter = useSelector(settingsSelectors.getFilter)
   const { categories, types, difficulties, formats } = useSelector(systemSelectors.getCategories)

   const getItemsWithChecked = useCallback(
      (filterName) => (i) => ({
         ...i,
         isChecked: filter[filterName].includes(String(i.id)),
      }),
      [filter],
   )

   const filterItems = useMemo(
      () =>
         [
            { title: 'Категория', filterName: 'category', items: categories },
            { title: 'Тип обучения', filterName: 'type', items: types },
            { title: 'Сложность', filterName: 'difficulty', items: difficulties },
            { title: 'Формат', filterName: 'format', items: formats },
         ].map((i) => ({
            ...i,
            items: i.items.map(getItemsWithChecked(i.filterName)),
         })),
      [categories, types, difficulties, formats, getItemsWithChecked],
   )

   useEffect(() => {
      const category = query.getAll('category') ?? []
      const type = query.getAll('type') ?? []
      const difficulty = query.getAll('difficulty') ?? []
      const format = query.getAll('format') ?? []
      setFilter({ ...filter, category, type, difficulty, format })
      return () => resetFilter()
   }, [location])

   const onChangeFilter = (filterName, value, checked) => {
      let newArray = [...filter[filterName]]
      if (checked) !newArray.includes(value) && newArray.push(value)
      else newArray = newArray.filter((item) => item !== value)

      const newfilter = { ...filter, [filterName]: newArray }
      setFilter(newfilter)
      navigate({
         pathname: location.pathname,
         search: `?${createSearchParams(newfilter)}`,
      })
   }

   return (
      <>
         <div className='filter'>
            <div className='filter__inner'>
               {filterItems.map((props, index) => (
                  <FilterItems key={index} {...props} onChange={onChangeFilter} />
               ))}
               {/* <Button className='filter__save'>Применить</Button> */}
            </div>
         </div>
         <div className='filter-bg'></div>
         {/* // TODO MOBILE VERSION */}
         {/* <div className='filter-mob filter-mob--selected'>
            <span>Фильтр</span>
            <i>2</i>
         </div>
         <div className='filter-tablet'>
            <div className='filter-tablet__item' data-filter='1'>
               <span>Тематика</span>
               <i></i>
            </div>
            <div className='filter-tablet__item filter-tablet__item--selected' data-filter='2'>
               <span>Тип обучения</span>
               <i>1</i>
            </div>
            <div className='filter-tablet__item' data-filter='3'>
               <span>Формат обучения</span>
               <i>1</i>
            </div>
         </div> */}
      </>
   )
}

export default Filter
