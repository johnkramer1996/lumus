import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { isActiveClass } from 'utils'

const FilterItem = ({ id = 1, filterName, onChange, name, isChecked = false, isHidden = false }) => {
   const [checked, setChecked] = useState(false)

   useEffect(() => setChecked(isChecked), [isChecked])

   const onChangeFilter = () => {
      const newChecked = !checked
      setChecked(newChecked)
      onChange(filterName, String(id), newChecked)
   }

   return (
      <div className={`filter__item checkbox ${isActiveClass(isHidden, 'filter__item--hidden')}`}>
         <input type='checkbox' className='checkbox' id={`checkbox-${filterName}-${id}`} name={filterName} checked={checked} value={id} onChange={onChangeFilter} />
         <label htmlFor={`checkbox-${filterName}-${id}`}>{name}</label>
      </div>
   )
}

FilterItem.propTypes = {
   id: PropTypes.number.isRequired,
   filterName: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
   name: PropTypes.string.isRequired,
   isHidden: PropTypes.bool,
   isChecked: PropTypes.bool,
}

export default FilterItem
