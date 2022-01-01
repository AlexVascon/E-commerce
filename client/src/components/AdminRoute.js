import React, {useEffect, useState} from 'react'
import { Navigate, Outlet } from 'react-router'
import instance from '../service/api'
import { LoadingSpinner } from './MyLibrary'

export default function AdminRoute() {
  const [user, setUser] = useState(undefined)

  const fetchUser = async () => {
    try {
      const {data} = await instance.get('/user/verify')
      setUser(data)
    } catch (err) {
      console.error(err)
      setUser(err)
    }
  }
  useEffect(() => {
    fetchUser()
  }, [])

  if(!user) return <LoadingSpinner big />
  
  return user?.isAdmin ? <Outlet /> : <Navigate to='/portal' />
}
