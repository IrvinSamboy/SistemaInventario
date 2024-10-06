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
import { useState } from 'react';
export default function SideBar() {
    const [showMenu, setShowMenu] = useState(false)

    const handleShowMenu = () => {
        setShowMenu(prev => !prev)
    }

    return (
        <>
            <FaBars className='cursor-pointer absolute z-10 top-[3%] left-[0.7%] text-2xl' onClick={handleShowMenu}/>
            <div className={`bg-white w-[300px] h-screen py-4 absolute transition-all duration-300 ease-in-out ${showMenu ? 'left-[0%]' : 'left-[-100%]'}`}>
                <h1 className='font-bold text-[#4338CA] text-[24px] px-3 py-8 text-center'>Sistema<span className='text-black'>Inventario</span></h1>
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
        </>
    )
}
