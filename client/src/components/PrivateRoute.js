import React, {useState, useEffect} from 'react'
import instance from '../service/api'
import { Navigate, Outlet } from 'react-router'
import { LoadingSpinner, View  } from './MyLibrary'

export default function PrivateRoute() {
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

  if(!user) {
    return (
    <View center>
      <LoadingSpinner size='15rem' />
    </View>
  )} 

  return user?.username ? <Outlet /> : <Navigate to='/portal' />
}