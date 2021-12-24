import React from 'react'
import {useSelector} from 'react-redux'
import { Navigate, Outlet } from 'react-router'

export default function AnonRoute() {
  const {verified} = useSelector((state) => state.authenticate)

  return verified ? <Navigate to='/account' /> : <Outlet />
}