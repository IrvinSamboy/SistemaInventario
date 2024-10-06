import React from 'react'
import { useEffect, useState } from 'react'
import useFetch from '../Hooks/useFetch'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Loader from '../components/Loader'

export default function VerifyAuthentication() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { makeFetch } = useFetch()
  const location = useLocation()
  const verifyLogin = async () => {
    try{
      const response = await makeFetch(`/api/auth/verifyLogin`)
      if(response.ok){
        setAuthenticated(true)
      }
      else{
       setAuthenticated(false)
      }
      setLoading(false)
    }
    catch(error){
      console.log(`Error verificando la autentificación ${error}`)
      setAuthenticated(false)
    }
  }
  
  useEffect(()=> {
    verifyLogin()
  }, [location])

  if (loading) return <Loader />;

  
  if(authenticated) return location.pathname !== '/'? <Navigate to='/' /> : <Outlet />

  return location.pathname !== '/signin'? <Navigate to='/signin' /> : <Outlet />

}
