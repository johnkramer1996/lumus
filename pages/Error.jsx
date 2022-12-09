import React from 'react'
import { Button } from 'components/ui'
import { RouteNames } from 'routes'

const Error = () => {
    return (
        <section className='error-page'>
            <div className='container'>
                <h1 className='error-page__title display-3'>Error page</h1>
                <Button to={RouteNames.HOME} className={'error-page__btn'} link>
                    Перейти на главную
                </Button>
            </div>
        </section>
    )
}

export default Error
