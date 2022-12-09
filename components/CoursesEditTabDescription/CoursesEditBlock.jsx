import { Button } from 'components/ui'
import React from 'react'
import CoursesEditBlockItem from './CoursesEditBlockItem'
import { ReactComponent as AddSvg } from 'svg/add.svg'

const CoursesEditBlock = ({ children, title, state, setState, onAddBlockItem, onDeleteBlock, onDeleteImg }) => {
   return (
      <div className='create-whom card-bg'>
         <h3 className='create-whom__title display-4'>{title}</h3>
         {state.map((props, index) => children({ ...props, state, index, onDelete: onDeleteBlock.bind(null, state, setState), onDeleteImg }))}
         <Button className='create-whom__add' onClick={onAddBlockItem.bind(null, state, setState)} outline>
            <AddSvg />
            <span>Добавить описание</span>
         </Button>
      </div>
   )
}

export default CoursesEditBlock
