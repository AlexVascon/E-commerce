import React from 'react'
import {useSelector} from 'react-redux'
import { Navigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'

export default function PrivateRoute({ children, redirectTo }) {
  const {authenticationLoading, verified} = useSelector((state) => state.authenticate)

  if (authenticationLoading) return <CircularProgress />
  
  return verified ? children : <Navigate to={redirectTo} />
}