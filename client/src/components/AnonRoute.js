import React, {useEffect, useState} from 'react'
import { Navigate, Outlet } from 'react-router'
import instance from '../service/api'
import { LoadingSpinner } from './MyLibrary'

export default function AnonRoute() {
  const [user, setUser] = useState(undefined)

  const fetchUser = async () => {
    try {
      const {data} = await instance.get('/user/verify')
      console.log('data:', data)
      setUser(data)
    } catch (err) {
      console.error(err)
      setUser(err.message)
    }
  }
  useEffect(() => {
    fetchUser()
  }, [])

  if(!user) return <LoadingSpinner big />

  return !user?.username ?  <Outlet /> : <Navigate to='/account' />
}