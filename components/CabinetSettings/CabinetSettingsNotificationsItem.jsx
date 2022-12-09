import React from 'react'

const CabinetSettingsNotificationsItem = ({ type, desc, sources, index, onChange }) => {
   return (
      <div className='account-settings__item'>
         <span className='account-settings__item-title'>{type}</span>
         <span className='account-settings__item-desc'>{desc}</span>

         <div className='account-settings__switches'>
            {sources.map(({ source, status }, indexSource) => (
               <div key={indexSource} className='account-settings__switch'>
                  {status}
                  <div className='account-settings__switch-title'>{source}</div>
                  <div className='account-settings__switch-input switch'>
                     <input type='checkbox' className='checkbox' id={`switch${index}-${indexSource}`} defaultChecked={status} onChange={(e) => onChange(index, indexSource, e.target.checked)} />
                     <label htmlFor={`switch${index}-${indexSource}`}></label>
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}

export default CabinetSettingsNotificationsItem
