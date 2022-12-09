import React from 'react'
import LoaderComponent from './Loader'

const LoaderWrapper = ({ children, isLoading, loader }) => {
   return isLoading ? typeof loader === 'object' ? loader : <LoaderComponent /> : children
}

export default LoaderWrapper
