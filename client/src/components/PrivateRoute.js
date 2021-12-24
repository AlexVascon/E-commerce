import React from 'react'
import {useSelector} from 'react-redux'
import { Navigate, Outlet } from 'react-router'

export default function PrivateRoute() {
  const {verified} = useSelector((state) => state.authenticate)
  
  return verified ? <Outlet /> : <Navigate to='/portal' />
}