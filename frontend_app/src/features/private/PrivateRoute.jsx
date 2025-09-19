import React from 'react'
import { useAuthMeQuery } from '../../api/authApi'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({children}) => {
    const {data, isLoading} = useAuthMeQuery()

    if(isLoading) return <div>Загрузка страницы...</div>

    if(!data) return <Navigate to="/login" replace />

  return children
}
