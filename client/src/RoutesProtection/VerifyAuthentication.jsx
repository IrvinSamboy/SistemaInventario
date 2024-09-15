import React from 'react'
import { useEffect, useState } from 'react'
import useFetch from '../Hooks/useFetch'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

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
  }, [])

  if(loading) return <h1>Cargando</h1>

  
  if(authenticated) return location.pathname !== '/'? <Navigate to='/' /> : <Outlet />

  return location.pathname !== '/singin'? <Navigate to='/singin' /> : <Outlet />

}
