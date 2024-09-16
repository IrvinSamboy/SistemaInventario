import { useState } from "react"
import useFetch from "../Hooks/useFetch"
import { useNavigate } from "react-router-dom";
export default function Signin() {
  
  const initialForm = {
    nombre: "",
    contraseña: ""
  }
  const navigate = useNavigate()
  const [userData, setUserData] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const {makeFetch} = useFetch()
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.id]: e.target.value
    })
    console.log(userData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true)
      const response = await makeFetch('/api/auth/signin', userData)
      if(response.ok) {
         navigate('/')
         console.log(response)
         return;
      }
      setError(true)
      setLoading(false)
    }
    catch(error){
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center h-svh ">
      <div className=" flex justify-center bg-white shadow-lg rounded-xl">
            <div className=" w-[800px]">
              <img src="https://res.cloudinary.com/dszrwebdv/image/upload/v1726433468/q4ncmpmwtofpngfai3tn.jpg" className=" rounded-l-lg" alt="" />
            </div>
            <div className="flex flex-col items-center justify-center w-[400px] p-10">
              <h2 className=" text-2xl mb-5 text-[#4338CA] font-semibold">¡Bienvenido!</h2>
              <h1 className="text-4xl mb-6 font-semibold">Iniciar sesión</h1>
              <form className="w-full h" onSubmit={handleSubmit}>
                <div className=" flex flex-col">
                  <label htmlFor="nombre" className=" text-lg mb-2 font-light">Usuario</label>
                  <input 
                      id="nombre"
                      type="text" 
                      required 
                      value={userData.nombre}
                      onChange={handleChange}
                      className=" border-2 bg-[#E5E7EB] w-full rounded-lg mb-4 p-1 shadow-md outline-none"
                  />
                </div>
                <div className=" flex flex-col">
                  <label htmlFor="contraseña" className=" text-lg mb-2 ffont-light" >Contraseña</label>
                  <input
                      id="contraseña"
                      type="password" 
                      required 
                      value={userData.contraseña}
                      onChange={handleChange}
                      className=" border-2 bg-[#E5E7EB] w-full rounded-lg mb-8 p-1 shadow-md outline-none" 
                  />
                </div>
                <button className="w-full text-xl bg-[#4338CA] text-white p-2.5 rounded-xl font-semibold hover:bg-[#3e34b6] active:bg-[#483adf]">Iniciar sesión</button>
              </form>
            </div>
          </div>
    </div>
    
  )
}
