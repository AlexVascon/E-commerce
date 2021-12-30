import React from 'react'
import { Navigate, Outlet } from 'react-router'

export default function AnonRoute() {
  const accessToken = localStorage.getItem('accessToken')
  
  return accessToken ? <Navigate to='/account' /> : <Outlet />
}