import React from 'react'

const CabinetStatisticsTab1 = () => {
    return (
        <div className='course-report__items course-report__items--trener card-bg'>
            <div className='course-report__item'>
                <span className='course-report__item-title'>% Комиссия</span>
                <div className='course-report__item-desc'>30%</div>
            </div>
            <div className='course-report__item'>
                <span className='course-report__item-title'>Заработано</span>
                <div className='course-report__item-desc'>100 000 руб.</div>
            </div>
            <div className='course-report__item'>
                <span className='course-report__item-title'>Начислено</span>
                <div className='course-report__item-desc'>70 000 руб.</div>
            </div>
            <div className='course-report__item'>
                <span className='course-report__item-title'>Выплачено</span>
                <div className='course-report__item-desc'>50 000 руб.</div>
            </div>
            <div className='course-report__item'>
                <span className='course-report__item-title'>Задолженность</span>
                <div className='course-report__item-desc yellow-text'>20 000 руб.</div>
            </div>
        </div>
    )
}

export default CabinetStatisticsTab1
