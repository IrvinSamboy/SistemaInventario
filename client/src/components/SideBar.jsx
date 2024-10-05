import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { FaTruck } from "react-icons/fa";
import { FaBoxes } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaBars } from "react-icons/fa";

export default function SideBar() {
  return (
    <div className=' flex gap-4'>
        <div className='bg-white w-[300px] h-screen py-4'>
            <div className='flex py-8 items-center px-3 text-[24px] gap-5'>
                <FaBars className='cursor-pointer'/>
                <h1 className='font-bold text-[#4338CA] text-[24px]'>Sistema<span className='text-black'>Inventario</span></h1>
            </div>
            <div className=' flex flex-col gap-8'>
                <div className='flex gap-2 items-center text-xl font-semibold px-5 py-3 hover:bg-gray-300 cursor-pointer'>
                    <IoMdHome />
                    <a>Inicio</a>
                </div>
                <div className='flex gap-2 items-center text-xl font-semibold px-5 py-3 hover:bg-gray-300 cursor-pointer'>
                    <FaUser />
                    <a>Usuarios</a>
                </div>
                <div className='flex gap-2 items-center text-xl font-semibold px-5 py-3 hover:bg-gray-300 cursor-pointer'>
                    <FaUsers />
                    <a>Empleados</a>
                </div>
                <div className='flex gap-2 items-center text-xl font-semibold px-5 py-3 hover:bg-gray-300 cursor-pointer'>
                    <FaTruck />
                    <a>Proveedores</a>
                </div>
                <div className='flex gap-2 items-center text-xl font-semibold px-5 py-3 hover:bg-gray-300 cursor-pointer'>
                    <BiSolidCategory />
                    <a>Categorias</a>
                </div>
                <div className='flex gap-2 items-center text-xl font-semibold px-5 py-3 hover:bg-gray-300 cursor-pointer'>
                    <FaBoxes />
                    <a>Productos</a>
                </div>
                <div className='flex gap-2 items-center text-xl font-semibold px-5 py-3 hover:bg-gray-300 cursor-pointer'>
                    <FaMoneyBillWave />
                    <a>Compra</a>
                </div>
            </div>
        </div>
        <div className='py-4 flex'>
            <h1>Hola</h1>
        </div>
    </div>
  )
}
