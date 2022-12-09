import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import CabinetSettingsDocsItem from './CabinetSettingsDocsItem'
import { systemSelectors } from 'store/selectors'

const CabinetSettingsDocs = ({ form, onChange }) => {
   const { userFileTypes } = useSelector(systemSelectors.getUserSettings)
   const docNames = ['Docs.FilePassport_1', 'Docs.FilePassport_2', 'Docs.FileTreaty', 'Docs.FileDiplom']

   return (
      <div className='account-settings__group card-bg'>
         <h3 className='account-settings__subtitle display-4'>Документы</h3>
         <div className='account-settings__desc'>Фото должны быть четкими, а текст на документах хорошо считываться</div>
         {docNames.map((name, index) => (
            <CabinetSettingsDocsItem key={index} name={name} label={userFileTypes[index]?.name} form={form} onChange={onChange} />
         ))}
      </div>
   )
}

CabinetSettingsDocs.propTypes = {
   onChange: PropTypes.func.isRequired,
}

export default CabinetSettingsDocs
