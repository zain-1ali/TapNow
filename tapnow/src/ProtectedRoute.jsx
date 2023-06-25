import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({isAuth}) => {
    if(!isAuth){
return <Navigate to={'/'}/>
    }
  return (
    <div>ProtectedRoute</div>
  )
}

export default ProtectedRoute